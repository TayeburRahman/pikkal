"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Cookies from "js-cookie";
import PasswordPopup from "@/components/Auth/PasswordPopup";
import Link from "next/link";
import { Loader, RefreshCw } from "lucide-react";
import ClientProfileLink from "@/components/ClientProfileLink/ClientProfileLink";
import ClientProfileLinkSkeleton from "@/components/ClientProfileLink/ClientProfileLinkSkeleton";

export default function Page() {

  const [clients, setClients] = useState([]);
  const [nextPageOffset, setNextPageOffset] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [accessGranted, setAccessGranted] = useState(
    Cookies.get("accessGranted")
  );


  // Define getClients function here
  const getClients = useCallback(async () => {

    try {
      setLoading(true);

      let params = {
        nextPageOffset
      }

      if (searchKeyword) params['searchKeyword'] = searchKeyword;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/clients`,
        {
          params,
        }
      );

      setClients([...clients, ...response.data.data.clients]);
      setNextPageOffset(response.data.data.nextPageOffset);

      const now = new Date();

      localStorage.setItem(
        "clientsData",
        JSON.stringify({
          data: {
            clients,
            nextPageOffset,
          },
          timestamp: now.getTime(),
        })
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);

      setLoading(false);
    }
  }, [clients, setClients, setNextPageOffset, searchKeyword, nextPageOffset, setLoading]);


  const searchClients = useCallback(async () => {

    try {
      setSearching(true);

      const url = `${window.location.origin}/api/clients?searchKeyword=${searchKeyword}`;
      const response = await axios.get(url);

      setClients([...response.data.data.clients]);

      setNextPageOffset(response.data.data.nextPageOffset);

      setSearching(false);
    } catch (error) {
      console.error("Error fetching data:", error);

      setLoading(false);
    }
  }, [setClients, searchKeyword, setNextPageOffset, setSearching]);


  const handleSearch = () => {

    if (loading) {
      return void(0);
    }

    searchClients()
  }


  useEffect(() => {
    setIsClient(true);
    const access = Cookies.get("accessGranted");
    setAccessGranted(access === "true");
  }, [setIsClient, setAccessGranted]);


  useEffect(() => {
    if (!accessGranted || loading || dataLoaded) {
      return;
    }

    getClients().then(() => setDataLoaded(true));
  }, [
    clients,
    getClients,
    setClients,
    setDataLoaded,
    accessGranted,
    setAccessGranted,
    setNextPageOffset,
    loading,
    dataLoaded
  ]);

  if (!isClient) {
    return null;
  }


  return (
    <>
      {!accessGranted && (
        <PasswordPopup
          client={null}
          onAccessGranted={() => {
            setAccessGranted(true);
          }}
        />
      )}

      {accessGranted && (
        <div className="px-2 md:px-24">
          <SectionTitle text="Profiles" />

          <div className="mt-10">
            <div className="w-full flex flex-row justify-center items-center m-0 p-0 mb-12">
              <input
                className="h-[38px] w-[80%] lg:w-full transition duration-300 shadow disabled:shadow-none disabled:cursor-not-allowed disabled:bg-slate-200 appearance-none border focus:border-blue-500 focus:shadow-md rounded py-3 px-5 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
                type="search"
                placeholder="Search by Name"
                value={searchKeyword}
                disabled={loading || searching}
                onChange={(e) => setSearchKeyword(e.target.value ?? "")}
                onKeyUp={(e) => {
                  setSearchKeyword(e.target.value ?? "")

                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  } else {
                    if (searchKeyword === "") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }
                }}
              />
            </div>

            {dataLoaded && clients.length > 0 && !searching ? (
              clients.map((client) => {

                if (!client || !client?.fields || !client?.fields["SEO:Slug"] || !client?.fields?.Client_Name) {
                  return null;
                }

                return (
                  <Link key={client.fields.Record_ID} href={`/${client.fields["SEO:Slug"]}`}>
                    <ClientProfileLink
                      key={client.fields.Record_ID}
                      clientName={client.fields.Client_Name}
                    />
                  </Link>
                )
              })
            ) : (
              <ClientProfileLinkSkeleton />
            )}
          </div>

          {nextPageOffset&& !searching && dataLoaded && (
            <div className="mt-5 w-full flex justify-center items-center p-0">
              <button
                className="no-print flex items-center justify-center disabled:opacity-50 mr-2 text-slate-800 font-semibold border-2 border-slate-600 shadow hover:shadow-lg bg-white hover:text-blue-500 py-2 px-4 rounded transition duration-300 ease-in-out hover:border-blue-500 disabled:text-slate-800 disabled:border-slate-600 disabled:shadow disabled:cursor-not-allowed"
                onClick={() => getClients()}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={24} />
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="" size={24} />
                    <span className="ml-2">Show More</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="my-24"></div>
    </>
  );
}
