import { NextResponse } from "next/server";
import axios from "axios";

const AIRTABLE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const CLIENTS_TABLE_NAME = "Clients";
const OUTREACH_TABLE_NAME = "Outreach";
const OUTREACH_URL = `${AIRTABLE_URL}/${BASE_ID}/${OUTREACH_TABLE_NAME}`;
const bookingFields = [
  "Lookup Podcast Name",
  "Lookup First Name",
  "Lookup Apple Link",
  "Lookup Audience",
  "Booking Date",
  "Booking Time",
  "Meeting_Link",
  "Find URL",
  "Lookup Hero Img Attach",
  "Lookup Social Reach"
].join("&fields[]=");



async function getClient(clientID) {
  const clientFields = [
    "Client_Name",
    "Startdate",
    "Email",
    "Linkedin",
    "Last Modified",
    "Created Time",
    "Record_ID",
    "OM ID",
    "Desc",
    "Lookup OM First Name",
    "Bookings",
    "LAST EMAIL SEND",
  ];

  const clientUrl = `${AIRTABLE_URL}/${BASE_ID}/${CLIENTS_TABLE_NAME}?fields[]=${clientFields.join(
    "&fields[]="
  )}&filterByFormula={Record_ID}='${clientID}'`;

  const clientResponse = await axios.get(clientUrl, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
    },
  });

  return clientResponse.data.records[0] ?? null;
}


async function fetchAllRecords(formula) {
  let allBookings = [];
  let offset = null;

  do {
    const bookingsUrl = `${OUTREACH_URL}?fields[]=${bookingFields}&filterByFormula=${formula}${
      offset ? "&offset=" + offset : ""
    }`;

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

export async function GET(req, { params }) {
  const { client_id } = params;

  const type = req.nextUrl.searchParams.get("type") || "published";

  if (!client_id) {
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

  try {
    const client = await getClient(client_id);

    if (!client) {
      return new NextResponse(
        JSON.stringify({ message: "Profile not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Removed Filters: {Lookup Audience} >= 2000

    const formulas = {
      booking: `AND({Lookup ClientID} = '${client_id}', {Booking Date} != '', {Booking Date} > TODAY())`,
      calender: `AND({Lookup ClientID} = '${client_id}', {Booking Date} != '')`,
      approved: `AND({Lookup ClientID} = '${client_id}', {Booking Confirmed} != '')`,
      new: `AND({Lookup ClientID} = '${client_id}', {Booking Confirmed} = '', {Client Approved} = 'SENT')`,
      published: `AND({Lookup ClientID} = '${client_id}', {Published} != '')`,
      "to-confirm": `AND({Lookup ClientID} = '${client_id}', {Booking Date} = '', {Response} = 'Yes')`,
    };

    const formula = formulas[type] ?? formulas["booking"];

    const allBookingsData = (await fetchAllRecords(formula)) ?? [];

    const responseData = {
      message: "Data fetched successfully",
      clientData: client,
      bookingsData: allBookingsData,
    };

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );

    return new NextResponse(
      JSON.stringify({
        message: "Failed to fetch data",
        error: error.response ? error.response.data : error.message,
      }),
      {
        status: error.response ? error.response.status : 202,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
