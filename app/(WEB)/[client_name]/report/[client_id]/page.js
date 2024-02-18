"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Table from "@/components/Table/Table"; // Import your customized Table component
import ClientDetailSkeleton from "@/components/ClientDetailSkeleton/ClientDetailSkeleton"; // Adjust the path as needed
import TableSkeleton from "@/components/Table/TableSkeleton"; // Adjust the path as needed
import Link from "next/link";
import { getClientFromLC, saveClientToLC } from "@/lib/utils";

const ImageSkeleton = () => (
  <div
    style={{
      width: "40px",
      height: "40px",
      backgroundColor: "#e0e0e0",
      borderRadius: "50%",
    }}
  ></div>
);

export default function ClientDetailPage() {
  const [reportData, setReportData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [tableDataLoaded, setTableDataLoaded] = useState(false);
  const [activeButton, setActiveButton] = useState("published");

  const params = useParams();
  const { client_id } = params;
  const { client_name } = params;

  const fetchData = async (apiEndpoint) => {
    try {
      const response = await axios.get(apiEndpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const fetchClientData = useCallback(async () => {

    setDataLoaded(false);

    const { data } = getClientFromLC(client_name);

    if (data && data.client) {
      setClientData(data.client);
      setDataLoaded(true);

      return;
    }

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/clients/${client_name}/report/${client_id}`;
    const result = await fetchData(endpoint);

    if (result && result.client) {
      setClientData(result.client);

      saveClientToLC(client_name, {
        client: result.client,
        videos: result.videos ?? [],
      })
    }

    setDataLoaded(true);
  }, [setDataLoaded, setClientData, client_id, client_name]);



  const handleLinkClick = useCallback(
    async (type) => {
      setTableDataLoaded(false);
      setActiveButton(type);

      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/clients/bookings/${client_id}?type=${type}`;
      const data = await fetchData(endpoint);

      console.log({ data: data.bookingsData })

      setReportData(data);
      setTableDataLoaded(true);
    },
    [setActiveButton, setTableDataLoaded, setReportData, client_id]
  );



  useEffect(() => {
    if (client_id) {
      fetchClientData();
      handleLinkClick("calendar");
    }
  }, [client_id, fetchClientData, handleLinkClick]);


  const columns = useMemo(
    () => [
      {
        Header: " ",
        accessor: "Lookup Hero Img Attach",
        Cell: ({ value }) => {
          if (Array.isArray(value) && value.length > 0) {
            const imageUrl = value[0].thumbnails
              ? value[0].thumbnails.large?.url
              : "/no-image.png";
            return imageUrl ? (
              <img
                src={imageUrl}
                alt="Hero Image"
                className="rounded-full min-w-[50px] min-h-[50px] w-full h-full max-h-full object-cover object-center shadow-lg"
              />
            ) : (
              <ImageSkeleton />
            );
          } else {
            return (
              <img
                src="/no-image.png"
                alt="Hero Image"
                className="rounded-full w-full h-fullobject-cover object-center shadow-lg max-h-[178px] max-w-[178px]"
              />
            );
          }
        },
      },
      {
        Header: "Podcast Name",
        accessor: "Lookup Podcast Name",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Host Name",
        accessor: "Lookup First Name",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Apple URL",
        accessor: "Lookup Apple Link",
        Cell: ({ value }) =>
          value ? (
            <a
              className="text-blue-600 underline"
              href={value}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          ) : (
            "-"
          ),
      },
      {
        Header: "Episode URL",
        accessor: "Find URL",
        Cell: ({ value }) =>
          value ? (
            <a
              className="text-blue-600 underline"
              href={value}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          ) : (
            "-"
          )
      },
      {
        Header: "Listeners",
        accessor: "Lookup Audience",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Social Reach",
        accessor: "Lookup Social Reach",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Booking Date",
        accessor: "Booking Date",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Booking Time",
        accessor: "Booking Time",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Booking URL",
        accessor: "Meeting_Link",
        Cell: ({ value }) => {
          return value &&
            value.search(new RegExp(/(http|https):\/\//)) === 0 ? (
            <a
              className="text-blue-600 underline"
              href={value}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          ) : (
            "-"
          );
        },
      }
    ],
    []
  );



  const unpublishedCols = useMemo(() => [
      {
        Header: " ",
        accessor: "Lookup Hero Img Attach",
        Cell: ({ value }) => {
          if (Array.isArray(value) && value.length > 0) {
            const imageUrl = value[0].thumbnails
              ? value[0].thumbnails.large?.url
              : "/no-image.png";
            return imageUrl ? (
              <img
                src={imageUrl}
                alt="Hero Image"
                className="rounded-full min-w-[50px] min-h-[50px] w-full h-full max-h-full object-cover object-center shadow-lg"
              />
            ) : (
              <ImageSkeleton />
            );
          } else {
            return (
              <img
                src="/no-image.png"
                alt="Hero Image"
                className="rounded-full w-full h-fullobject-cover object-center shadow-lg max-h-[178px] max-w-[178px]"
              />
            );
          }
        },
      },
      {
        Header: "Podcast Name",
        accessor: "Lookup Podcast Name",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Host Name",
        accessor: "Lookup First Name",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Apple URL",
        accessor: "Lookup Apple Link",
        Cell: ({ value }) =>
          value ? (
            <a
              className="text-blue-600 underline"
              href={value}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          ) : (
            "-"
          ),
      },
      {
        Header: "Listeners",
        accessor: "Lookup Audience",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Social Reach",
        accessor: "Lookup Social Reach",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Booking Date",
        accessor: "Booking Date",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Booking Time",
        accessor: "Booking Time",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Booking URL",
        accessor: "Meeting_Link",
        Cell: ({ value }) => {
          return value &&
            value.search(new RegExp(/(http|https):\/\//)) === 0 ? (
            <a
              className="text-blue-600 underline"
              href={value}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          ) : (
            "-"
          );
        },
      }
    ],
    []
  )



  const tableData = useMemo(() => {
    if (Array.isArray(reportData?.bookingsData)) {
      setTableDataLoaded(false);

      const sortedData = reportData.bookingsData
        .map((booking) => {
          return booking.fields
        })
        .sort((a, b) => {
          const dateA = a["Booking Date"]
            ? new Date(a["Booking Date"])
            : new Date(0);
          const dateB = b["Booking Date"]
            ? new Date(b["Booking Date"])
            : new Date(0);
          return dateB - dateA;
        });

      setTableDataLoaded(true);

      return sortedData;
    }

    return [];
  }, [reportData]);

  const buttonClass = "py-2 px-4 rounded transition duration-300 ease-in-out";
  const activeClass =
    "bg-slate-800 text-white font-semibold hover:bg-slate-900 shadow hover:shadow-lg";
  const inactiveClass =
    "bg-white text-slate-800 font-semibold hover:bg-slate-100 border border-slate-300 shadow hover:shadow-lg";

  return (
    <>
      <div className="px-2 md:px-24">
        <>
          {dataLoaded ? (
            <div className="group flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full mt-4 text-left text-neutral-800 rounded-xl overflow-hidden">
              <section className="block pt-2 pb-2 leading-6 text-left bg-white text-neutral-800">
                <div className="px-4 mx-auto max-w-full text-left">
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/3 flex justify-center pb-5">
                      <div className="w-64 h-64 relative overflow-hidden rounded-full border-4 border-white shadow-xl">
                        {clientData?.Clientimg_attach[0]?.url && (
                          <img
                            src={clientData.Clientimg_attach[0]?.url ?? ""}
                            alt="Profile"
                            className="rounded-full w-full h-full max-h-full object-cover"
                            loading="eager" // Disable lazy loading
                            priority="" // Indicates to preload this image
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-full lg:w-2/3 lg:pl-4 flex flex-col justify-center">
                      <h1 className="text-5xl font-semibold text-zinc-800 my-2">
                        {clientData?.Client_Name}
                      </h1>
                      <p className="text-lg mt-2 text-slate-800 font-semibold">
                        {clientData?.Title}
                      </p>

                      <hr className="my-5"></hr>

                      <Link
                        href={`/${clientData ? clientData["SEO:Slug"] : ""}`}
                        className="inline-block"
                      >
                        <button className="flex items-center justify-center text-slate-800 font-semibold border-2 border-slate-600 shadow hover:shadow-lg bg-white py-2 px-4 rounded transition duration-300 ease-in-out">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-user-round-check"
                          >
                            <path d="M2 21a8 8 0 0 1 13.292-6" />
                            <circle cx="10" cy="8" r="5" />
                            <path d="m16 19 2 2 4-4" />
                          </svg>

                          <span className="ml-2 hidden md:block">Profile</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div>
              <ClientDetailSkeleton />
            </div>
          )}

          <hr className="my-5 border-0 h-1 bg-gradient-to-r from-white to-slate-400 rounded opacity-50" />

          {dataLoaded ? (
            <div>
              <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-5 flex-wrap">
                <button
                  className={`${buttonClass} ${
                    activeButton === "calendar" ? activeClass : inactiveClass
                  }`}
                  onClick={() => handleLinkClick("calendar")}
                >
                  CALENDAR
                </button>
                <button
                  className={`${buttonClass} ${
                    activeButton === "approved" ? activeClass : inactiveClass
                  }`}
                  onClick={() => handleLinkClick("approved")}
                >
                  APPROVED
                </button>
                <button
                  className={`${buttonClass} ${
                    activeButton === "new" ? activeClass : inactiveClass
                  }`}
                  onClick={() => handleLinkClick("new")}
                >
                  FOR APPROVAL
                </button>
                <button
                  className={`${buttonClass} ${
                    activeButton === "published" ? activeClass : inactiveClass
                  }`}
                  onClick={() => handleLinkClick("published")}
                >
                  PUBLISHED
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="group flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">
                <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-5">
                  <div className="w-20 h-10 bg-slate-200 animate-pulse rounded"></div>
                  <div className="w-20 h-10 bg-slate-200 animate-pulse rounded"></div>
                  <div className="w-20 h-10 bg-slate-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          )}

          {tableDataLoaded ? (
            <div className="bookings-table">
              <Table columns={activeButton === "published" ? columns : unpublishedCols} data={tableData} />
            </div>
          ) : (
            <div className="mb-24">
              <TableSkeleton />
            </div>
          )}
        </>
      </div>
    </>
  );
}
