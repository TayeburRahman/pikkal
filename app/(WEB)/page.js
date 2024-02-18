"use client";

import SpeakerCardSkeleton from "@/components/MediaCard/SpeakerCardSkeleton";
import PodcastCard from "@/components/PodcastCard/PodcastCard";
import PodcastCardSkeleton from "@/components/PodcastCard/PodcastCardSkeleton";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import SpeakerCard from "@/components/SpeakerCard/SpeakerCard";
import axios from "axios";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const [podcastsLoading, setPodcastsLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);

  // Replace this function with your actual data fetching logic
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/featured-clients`
      );

      setClients([...clients, ...response.data.data.clients]);

      const now = new Date();

      localStorage.setItem(
        "featuredClientsData",
        JSON.stringify({
          data: {
            clients,
          },
          timestamp: now.getTime(),
        })
      );

      setLoading(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to fetch profiles, please try again."
      );

      setLoading(false);
    }
  }, [clients, setClients, setLoading]);

  // to fetch the featured podcasts
  const fetchFeaturedPodcasts = useCallback(async () => {
    try {
      setPodcastsLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/featured-podcasts`
      );

      setPodcasts(response.data.data.podcasts);

      const now = new Date();

      localStorage.setItem(
        "featuredPodcastsData",
        JSON.stringify({
          data: {
            podcasts,
          },
          timestamp: now.getTime(),
        })
      );

      setPodcastsLoading(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to fetch podcasts, please try again."
      );

      setLoading(false);
    }
  }, [podcasts, setPodcasts, setPodcastsLoading]);

  // Simulate data fetching
  useEffect(() => {
    // Check if data is already in cache

    if (clients.length > 0) {
      return;
    }

    const cachedData = localStorage.getItem("featuredClientsData");

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = new Date();

      if (now.getTime() - timestamp < 60000 * 5 && data.clients.length > 0) {
        setClients(data.clients);
        setDataLoaded(true);
      } else {
        fetchData().then(() => setDataLoaded(true));
      }
    } else {
      fetchData().then(() => setDataLoaded(true));
    }
  }, [setDataLoaded, fetchData, setClients, clients]);

  useEffect(() => {
    // Check if data is already in cache

    if (podcasts.length > 0) {
      return;
    }

    const cachedData = localStorage.getItem("featuredPodcastsData");

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = new Date();

      if (now.getTime() - timestamp < 60000 * 5 && data.podcasts.length > 0) {
        setPodcasts(data.podcasts);
      } else {
        fetchFeaturedPodcasts();
      }
    } else {
      fetchFeaturedPodcasts();
    }
  }, [fetchFeaturedPodcasts, setPodcasts, podcasts]);

  return (
    <>
      <div className="px-24">
        <SectionTitle text="Find Your Next Podcast Guest..." />
      </div>

      <div className="">
        <div className="flex flex-wrap justify-center">
          {dataLoaded ? (
            <>
              {clients.map((client, index) => (
                <SpeakerCard key={index} client={client.fields} />
              ))}

              <div className="mt-5 w-full flex justify-center items-center p-0">
                <Link
                  href="/profiles"
                  className="no-print flex items-center justify-center disabled:opacity-50 mr-2 text-slate-800 font-semibold border-2 border-slate-600 shadow hover:shadow-lg bg-white hover:text-blue-500 py-2 px-4 rounded transition duration-300 ease-in-out hover:border-blue-500 disabled:text-slate-800 disabled:border-slate-600 disabled:shadow disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={24} />
                      <span className="ml-2">Loading...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="" size={24} />
                      <span className="ml-2">All Speakers</span>
                    </>
                  )}
                </Link>
              </div>
            </>
          ) : (
            <>
              <SpeakerCardSkeleton />
              <SpeakerCardSkeleton />
              <SpeakerCardSkeleton />
              <SpeakerCardSkeleton />
              <SpeakerCardSkeleton />
              <SpeakerCardSkeleton />
            </>
          )}
        </div>
      </div>

      <div className="my-10"></div>

      <div className="px-24">
        <SectionTitle text="Some of the Quality Podcasts We Work With" />
      </div>

      <div className="px-8">
        <div className="flex flex-wrap justify-center">
          {!podcastsLoading ? (
            <>
              {podcasts.map((pod, index) => (
                <PodcastCard key={index} podcast={pod.fields} />
              ))}
            </>
          ) : (
            <>
              <PodcastCardSkeleton />
              <PodcastCardSkeleton />
              <PodcastCardSkeleton />
              <PodcastCardSkeleton />
              <PodcastCardSkeleton />
              <PodcastCardSkeleton />
              <PodcastCardSkeleton />
              <PodcastCardSkeleton />
            </>
          )}
          {/* <>
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
          </> */}
        </div>
      </div>

      <div className="my-24"></div>
    </>
  );
}
