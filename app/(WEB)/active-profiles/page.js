"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Cookies from "js-cookie";
import PasswordPopup from "@/components/Auth/PasswordPopup";
import toast from "react-hot-toast";
import ClientProfilesGallerySkeleton from "@/components/ClientProfilesGallery/ClientProfilesGallerySkeleton";
import ClientProfilesGallery from "@/components/ClientProfilesGallery/ClientProfilesGallery";
import { Loader, RefreshCw } from "lucide-react";

export default function Page() {

  const [clients, setClients] = useState([]);
  const [nextPageOffset, setNextPageOffset] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [changingRoute, setChangingRoute] = useState(true);
  const [accessGranted, setAccessGranted] = useState(
    Cookies.get("accessGranted")
  );

  // Define fetchData function here
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/active-clients`,
        {
          params: {
            nextPageOffset,
          },
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

      toast.error(
        error?.response?.data?.message ??
          "Failed to fetch profiles, please try again."
      );

      setLoading(false);
    }
  }, [clients, setClients, setNextPageOffset, nextPageOffset, setLoading]);

  useEffect(() => {
    setIsClient(true);
    const access = Cookies.get("accessGranted");
    setAccessGranted(access === "true");
  }, [setIsClient, setAccessGranted]);

  useEffect(() => {
    // Check if data is already in cache

    if (!accessGranted || clients.length > 0) {
      return;
    }

    const cachedData = localStorage.getItem("activeClientsData");

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = new Date();

      if (now.getTime() - timestamp < 60000 * 5 && data.clients.length > 0) {
        setClients(data.clients);
        setNextPageOffset(data.nextPageOffset);
        setDataLoaded(true);
      } else {
        fetchData().then(() => setDataLoaded(true));
      }
    } else {
      fetchData().then(() => setDataLoaded(true));
    }
  }, [
    clients,
    fetchData,
    setClients,
    setDataLoaded,
    accessGranted,
    setAccessGranted,
    setNextPageOffset,
  ]);

  if (!isClient) {
    return null;
  }

  // router.events.on('routeChangeStart', () => {
  //   setChangingRoute(true);
  // });

  // router.events.on('routeChangeComplete', () => {
  //   setChangingRoute(false);
  // });

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
          <SectionTitle text="Active Profiles" />

          <div className="mt-10">
            {dataLoaded ? (
              <ClientProfilesGallery clients={clients} />
            ) : (
              <ClientProfilesGallerySkeleton />
            )}
          </div>

          {nextPageOffset && (
            <div className="mt-5 w-full flex justify-center items-center p-0">
              <button
                className="no-print flex items-center justify-center disabled:opacity-50 mr-2 text-slate-800 font-semibold border-2 border-slate-600 shadow hover:shadow-lg bg-white hover:text-blue-500 py-2 px-4 rounded transition duration-300 ease-in-out hover:border-blue-500 disabled:text-slate-800 disabled:border-slate-600 disabled:shadow disabled:cursor-not-allowed"
                onClick={() => fetchData()}
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

      {/* {changingRoute && (
        <div className="w-full h-full absolute top-0 left-0 z-[9999] bg-[rgba(255,255,255,0.5)] flex flex-col justify-center items-center">
          <Loader className="animate-spin" size={48} />
        </div>
      )} */}

      <div className="my-24"></div>
    </>
  );
}
