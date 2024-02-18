import { NextResponse } from "next/server";
import axios from "axios";
import Cache from "memory-cache";

const cache = new Cache.Cache();
const AIRTABLE_URL = "https://api.airtable.com/v0";
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = "CATEGORIES";
const CACHE_KEY = "categories-data";
const CACHE_DURATION_MS = 60 * 60 * 1000; // Cache duration in milliseconds (5 minutes)

export async function GET() {
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
    const url = `${AIRTABLE_URL}/${BASE_ID}/${TABLE_NAME}`;
    const categories = [];
    let nextPageOffset = "";

    do {
      console.log("[+] doing...")
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        },
        params: {
          offset: nextPageOffset,
          sort: [
            {
              field: "CATEGORY",
              direction: "asc",
            },
          ],
        },
      });

      if (response.data && Array.isArray(response.data.records)) {
        categories.push(...response.data.records);
      }

      nextPageOffset = response.data.offset;
    } while (nextPageOffset);

    const responseData = {
      message: "Categories fetched successfully",
      data: {
        categories,
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
    console.log("[!] Error while fetching categories:");

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
