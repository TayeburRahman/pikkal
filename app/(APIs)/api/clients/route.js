export const dynamic = "force-dynamic";


import axios from "axios";
import Cache from "memory-cache";
import { NextResponse } from "next/server";

const cache = new Cache.Cache();
const AIRTABLE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = "Clients";
const CACHE_KEY = "clients-data";
const CACHE_DURATION_MS = 1; // Cache duration in milliseconds (5 minutes)

export async function GET(req) {
  // Check if data is already in cache
  const cachedData = cache.get(CACHE_KEY);
  if (cachedData) {
    return new NextResponse(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {

    const url = new URL(req.url);
    const searchKeyword = url.searchParams.get("searchKeyword") ?? "";
    const nextPageOffset = url.searchParams.get("nextPageOffset") ?? "";
    const formula = searchKeyword ? `AND(REGEX_MATCH(LOWER({Client_Name}), ".*${searchKeyword.toLowerCase().replace(/"/g, '""')}.*"), {Public} = 1)` : '';
    const fullUrl = `${AIRTABLE_URL}/${BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula=${formula}`;

    const response = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
      },
      params: {
        pageSize: 20,
        sort: [
          {
            field: "Client_Name",
            direction: "asc",
          },
        ],
        offset: nextPageOffset ?? "",
      },
    });



    const responseData = {
      message: "Data fetched successfully",
      data: {
        clients: response.data.records,
        nextPageOffset: response.data.offset,
      },
    };

    // Store response in cache
    cache.put(CACHE_KEY, responseData, CACHE_DURATION_MS);

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {

    console.log("[!] Error while fetching profiles:");

    console.log(error);

    let message = "Failed to fetch profiles, please try again.";

    if (error.code === "ETIMEDOUT" || error.code === "ENETUNREACH") {
      message = "Request timed out. Please try again.";
    }

    return new NextResponse(
      JSON.stringify({
        message,
        error: error.response ? error.response.data : error.message,
      }),
      {
        status: error.response ? error.response.status : 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
