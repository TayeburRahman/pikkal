import { NextResponse } from "next/server";
import axios from "axios";
import Cache from "memory-cache";

const cache = new Cache.Cache();
const AIRTABLE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_CLIENT_TABLE_NAME = "Clients";
const AIRTABLE_VIDEO_TABLE_NAME = "CLIENTVIDEOS";
const CACHE_DURATION_MS = 5 * 60 * 1000; // Cache duration in milliseconds (5 minutes)
const AIRTABLE_OUTREACH_TABLE_NAME = "Outreach";
const MAX_RECORDS_PER_REQUEST = 100;

export async function GET(req, { params }) {
  const { client_name } = params;
  if (!client_name) {
    return new NextResponse(
      JSON.stringify({ message: "Client ID is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  const CLIENT_CACHE_KEY = `client-data-${client_name}`; // Unique cache key for each client
  const VIDEO_CACHE_KEY = `client-videos-${client_name}`; // Unique cache key for client videos

  // Check if client data is already in cache
  let clientData = cache.get(CLIENT_CACHE_KEY);
  let videosData = cache.get(VIDEO_CACHE_KEY);

  if (!clientData) {
    try {
      const clientUrl = `${AIRTABLE_URL}/${BASE_ID}/${AIRTABLE_CLIENT_TABLE_NAME}`;

      const clientResponse = await axios.get(clientUrl, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        },
        params: {
          filterByFormula: `{SEO:Slug}='${client_name}'`,
        },
      });

      if (
        clientResponse &&
        clientResponse.data &&
        clientResponse.data.records &&
        clientResponse.data.records.length > 0
      ) {
        // Store the client data in the cache
        clientData = {
          message: "Client data fetched successfully",
          client: clientResponse.data.records[0].fields,
        };

        cache.put(CLIENT_CACHE_KEY, clientData, CACHE_DURATION_MS);
      } else {
        console.error("Client not found");

        return new NextResponse(
          JSON.stringify({
            message: "Profile Not Found!",
            error: "Profile Not Found!",
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
    } catch (error) {
      console.error(
        "Error fetching client data:",
        error.response ? error.response.data : error.message
      );

      return new NextResponse(
        JSON.stringify({
          message: "Failed to fetch client data",
          error: error.response ? error.response.data : error.message,
        }),
        {
          status: error.response ? error.response.status : 502,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  }

  if (
    !videosData &&
    clientData.client.Client_Videos &&
    clientData.client.Client_Videos.length > 0
  ) {
    try {
      const formula = `AND({CLIENTID} = '${clientData.client.Record_ID}', {Video Name} != '', {Video_Embed} != '', {Video URL} != '', {ERROR} = '')`;
      const videoUrl = `${AIRTABLE_URL}/${BASE_ID}/${AIRTABLE_VIDEO_TABLE_NAME}`;
      const response = await axios.get(videoUrl, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        },
        params: {
          filterByFormula: formula,
          sort: [
            {
              field: "RATING",
              direction: "desc",
            },
          ],
        },
      });

      videosData = response.data?.records ?? [];

      // Store the videos data in the cache
      cache.put(VIDEO_CACHE_KEY, videosData, CACHE_DURATION_MS);
    } catch (error) {
      console.error(
        "Error fetching videos data:",
        error.response ? error.response.data : error.message
      );

      return new NextResponse(
        JSON.stringify({
          message: "Failed to fetch videos data",
          error: error.response ? error.response.data : error.message,
        }),
        {
          status: error.response ? error.response.status : 502,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  }

  async function fetchAllRecords(bookingsFilter, fields) {
    let allBookings = [];
    let offset = "";

    // Function to fetch records for a chunk of bookings
    do {
      const bookingsUrl = `${AIRTABLE_URL}/${BASE_ID}/${AIRTABLE_OUTREACH_TABLE_NAME}?fields[]=${fields.join(
        "&fields[]="
      )}&filterByFormula=${bookingsFilter}${offset ? "&offset=" + offset : ""}`;

      const response = await axios.get(bookingsUrl, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        },
      });

      allBookings = allBookings.concat(response.data.records);
      offset = response.data.offset;
    } while (offset);

    return allBookings;
  }

  const bookingFields = [
    "Lookup Podcast Name",
    "Lookup First Name",
    "Lookup Apple Link",
    "Lookup Audience",
    "Booking Date",
    "Booking Time",
    "Meeting_Link",
    "Lookup Hero Img Attach",
  ];

  let allBookingsData = [];

  if (
    Array.isArray(clientData.client.Bookings) &&
    clientData.client.Bookings.length > 0
  ) {
    let combinedFilter = "";

    combinedFilter = `AND({Lookup ClientID} = '${clientData.client.Record_ID}', {Published} != '', {Lookup Audience} >= 2000)`;

    if (combinedFilter) {
      allBookingsData = await fetchAllRecords(combinedFilter, bookingFields);
    }
  }

  // Combine client and videos data and booking data into a single response
  const combinedData = {
    ...clientData,
    videos: videosData,
    bookings: allBookingsData,
  };

  return new NextResponse(JSON.stringify(combinedData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
