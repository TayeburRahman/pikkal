import { NextResponse } from "next/server";
import axios from "axios";
import Cache from 'memory-cache';

const cache = new Cache.Cache();
const AIRTABLE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_CLIENT_TABLE_NAME = "Clients";
const AIRTABLE_VIDEO_TABLE_NAME = "CLIENTVIDEOS";
const CACHE_DURATION_MS = 1000; // Cache duration in milliseconds (5 minutes)

export async function GET(_req, { params }) {
  const { client_id } = params;
  if (!client_id) {
    return new NextResponse(JSON.stringify({ message: "Client ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const CLIENT_CACHE_KEY = `client-data-${client_id}`; // Unique cache key for each client
  const VIDEO_CACHE_KEY = `client-videos-${client_id}`; // Unique cache key for client videos

  // Check if client data is already in cache
  let clientData = cache.get(CLIENT_CACHE_KEY);
  let videosData = cache.get(VIDEO_CACHE_KEY);

  if (!clientData) {
    try {
      const clientUrl = `${AIRTABLE_URL}/${BASE_ID}/${AIRTABLE_CLIENT_TABLE_NAME}?filterByFormula={Record_ID}='${client_id}'`;
      const clientResponse = await axios.get(clientUrl, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        },
      });

      // Store the client data in the cache
      clientData = {
        message: "Client data fetched successfully",
        client: clientResponse.data.records[0].fields,
      };

      cache.put(CLIENT_CACHE_KEY, clientData, CACHE_DURATION_MS);

    } catch (error) {
      console.error(
        "Error fetching client data:",
        error.response ? error.response.data : error.message
      );

      return new NextResponse(JSON.stringify({
        message: "Failed to fetch client data",
        error: error.response ? error.response.data : error.message,
      }), {
        status: error.response ? error.response.status : 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }

  if (!videosData && clientData.client.Client_Videos && clientData.client.Client_Videos.length > 0) {
    try {
      const videoIds = clientData.client.Client_Videos.slice(0, 20);

      const videoPromises = videoIds.map(videoId => {
        const videoUrl = `${AIRTABLE_URL}/${BASE_ID}/${AIRTABLE_VIDEO_TABLE_NAME}/${videoId}`;
        return axios.get(videoUrl, {
          headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
          },
        });
      });

      // Resolve all promises to get video data
      const videoResponses = await Promise.all(videoPromises);
      videosData = videoResponses.map(response => response.data);

      // Store the videos data in the cache
      cache.put(VIDEO_CACHE_KEY, videosData, CACHE_DURATION_MS);

    } catch (error) {
      console.error(
        "Error fetching videos data:",
        error.response ? error.response.data : error.message
      );
      return new NextResponse(JSON.stringify({
        message: "Failed to fetch videos data",
        error: error.response ? error.response.data : error.message,
      }), {
        status: error.response ? error.response.status : 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }

  // Combine client and videos data into a single response
  const combinedData = {
    ...clientData,
    videos: videosData,
  };

  return new NextResponse(JSON.stringify(combinedData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
