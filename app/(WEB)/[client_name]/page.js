/* eslint-disable @next/next/no-img-element */
"use client";

import ClientIDPopup from "@/components/Auth/ClientIDPopup";
import axios from "axios";
import Link from "next/link";
import { redirect, useParams } from "next/navigation"; // Or use useRouter from 'next/router'
import { useCallback, useEffect, useState } from "react";

// Component imports
import PasswordPopup from "@/components/Auth/PasswordPopup";
import ClientDesc from "@/components/ClientDesc/ClientDesc";
import ClientDescSkeleton from "@/components/ClientDesc/ClientDescSkeleton";
import ClientDetailSkeleton from "@/components/ClientDetailSkeleton/ClientDetailSkeleton";
import MarkText from "@/components/MarkText/MarkText";
import MarkTextSkeleton from "@/components/MarkText/MarkTextSkeleton";
import MediaCard from "@/components/MediaCard/MediaCard";
import MediaCardSkeleton from "@/components/MediaCard/MediaCardSkeleton";
import PodcastEpisodeCard from "@/components/PodcastEpisodeCard/PodcastEpisodeCard";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import ShowReel from "@/components/ShowReel/ShowReel";
import { getClientFromLC, saveClientToLC } from "@/lib/utils";
import Cookies from "js-cookie";
import { Download, Instagram, Loader, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ClientDetailPage() {
  const [clientData, setClientData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [bookingsData, setBookingsData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [client_id, setClient_id] = useState(null);

  const { client_name } = useParams();

  const [accessGranted, setAccessGranted] = useState(
    Cookies.get("accessGranted_" + client_name) === "true"
  );

  // Fetches data from the API
  const fetchData = useCallback(async (apiEndpoint) => {
    try {
      const response = await axios.get(apiEndpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Fetches client data and updates state
  const fetchClientData = useCallback(async () => {
    setDataLoaded(false);

    setAccessGranted(Cookies.get("accessGranted_" + client_name) === "true");

    const { data } = getClientFromLC(client_name);

    if (data && data.client) {
      setClientData(data.client);
      setVideoData(data.videos);
      setClient_id(data.client.Record_ID);

      setDataLoaded(true);

      return void 0;
    }

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/clients/${client_name}`;
    const result = await fetchData(endpoint);

    if (result && result.client) {
      setClientData(result.client);
      setVideoData(result.videos);

      setClient_id(result?.client?.Record_ID);

      saveClientToLC(client_name, {
        client: result.client,
        videos: result.videos,
      });
    }

    if (result && result.bookings) {
      setBookingsData(result.bookings);
    }

    setDataLoaded(true);
  }, [
    client_name,
    fetchData,
    setClientData,
    setBookingsData,
    setVideoData,
    setClient_id,
  ]);

  useEffect(() => {
    if (accessGranted) {
      console.log("[+] Access granted!");
      return;
    } else {
      console.log("[-] Access denied for accessGranted_" + client_name + " !");
      setAccessGranted(Cookies.get("accessGranted_" + client_name));
    }
  }, [setAccessGranted, accessGranted, client_name]);

  // Fetch client data on component mount or when client_name changes
  useEffect(() => {
    if (client_name && clientData) {
      console.log("[+] This part is returning");
      return;
    }

    console.log("[+] This part is not returning");

    if (client_name) fetchClientData();
    else redirect("/profiles");
  }, [
    clientData,
    client_name,
    fetchClientData
  ]);


  return (
    <>
      {
        dataLoaded ? (
          <>
            {
              accessGranted ? (
                <div className="px-2 md:px-24">
                  {/* Client Profile Section */}
                  <div>
                    <ClientProfile
                      clientData={clientData}
                      client_name={client_name}
                      client_id={client_id}
                    />

                    {/* Divider */}
                    <Divider />
                  </div>

                  <div>
                    {/* Client Intro Section */}
                    <ClientContact clientData={clientData} />
                  </div>

                  <div>
                    {/* Client Description */}
                    {
                      clientData?.Desc ? (
                        <ContentSection title={`About ${clientData?.Client_Name}`}>
                          <ClientDesc
                            data={clientData.Desc}
                            linkedin={clientData.Linkedin}
                          />
                        </ContentSection>
                      ) : null
                    }
                  </div>

                  <div className="content-section">
                    {/* Media Cards Section */}
                    {
                      clientData?.["Lookup Images"] ? (
                        <ContentSection title="">
                          <MediaCard images={clientData["Lookup Images"]} />
                        </ContentSection>
                      ) : null
                    }
                  </div>

                  <div className="content-section ">
                    {/* Key Talking Points Section */}
                    {
                      clientData?.["Talking Points"] ? (
                        <ContentSection title={`Talking Points`}>
                          <div className="">
                            <MarkText data={clientData["Talking Points"]} />
                          </div>
                        </ContentSection>
                      ) : null
                    }
                  </div>

                  <div className="content-section ">
                    {/* Key Points Section */}
                    {
                      clientData?.["3 KEY POINTS"] ? (
                        <ContentSection title={`Why ${clientData?.Client_Name}?`}>
                          <div className="">
                            <MarkText data={clientData["3 KEY POINTS"]} />
                          </div>
                        </ContentSection>
                      ) : null
                    }
                  </div>

                  <div className="content-section">
                    {
                      videoData && videoData.length > 0 ? (
                        <ContentSection title="Video Showreel">
                          <ShowReel videos={videoData} />
                        </ContentSection>
                      ) : null
                    }
                  </div>

                  <div className="content-section">
                    {/* Podcast Episodes Section  */}
                    {
                      bookingsData && bookingsData.length > 0 ? (
                        <ContentSection title="Podcast Episodes">
                          <PodcastEpisodeCard bookings={bookingsData} />
                        </ContentSection>
                      ) : null
                    }
                  </div>

                  <div>
                    {/* Recommended Podcast Audience Section */}
                    {
                      clientData?.["AUDIENCE"] ? (
                        <ContentSection title="Recommended Podcast Audience">
                          <MarkText data={clientData["AUDIENCE"]} />
                        </ContentSection>
                      ) : null
                    }
                  </div>

                  <div>
                    {/* Sample Podcast Questions Section */}
                    {
                      clientData?.["KEY QUESTIONS"] ? (
                        <ContentSection title="Sample Podcast Questions">
                          <MarkText data={clientData["KEY QUESTIONS"]} />
                        </ContentSection>
                      ) : null
                    }
                  </div>

                  <div className="mt-32"></div>
                </div>
              ) : (
                <PasswordPopup
                  onAccessGranted={setAccessGranted}
                  client={clientData}
                />
              )
            }
          </>
        ) : (
          <div className="px-2 md:px-24">
            {/* Client Profile Section */}
            <div>
              <ClientDetailSkeleton />

              {/* Divider */}
              <Divider />
            </div>

            <div>
              {/* Client Description */}
              <ClientDescSkeleton />
            </div>

            <div className="content-section">
              {/* Media Cards Section */}
              <MediaCardSkeleton />
            </div>

            <div className="content-section ">
              {/* Key Talking Points Section */}
              <MarkTextSkeleton />
            </div>

            <div className="content-section ">
              {/* Key Points Section */}
              <MarkTextSkeleton />
            </div>

            <div className="content-section">
              <MarkTextSkeleton />
            </div>

            <div className="content-section">
              {/* Podcast Episodes Section  */}
              <MarkTextSkeleton />
            </div>

            <div>
              {/* Recommended Podcast Audience Section */}
              <MarkTextSkeleton />
            </div>

            <div>
              {/* Sample Podcast Questions Section */}
              <MarkTextSkeleton />
            </div>

            <div className="mt-32"></div>
          </div>
        )
      }
    </>
  );
}

// Components for structured sections
const ClientProfile = ({ clientData, client_name, client_id }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const savedToken = Cookies.get("clientToken");
  const router = useRouter();
  const profilePictureUrl = clientData?.Clientimg_attach[0]?.url || "";

  const handlePopupOpen = () => {
    toast.dismiss();

    if (savedToken) {
      const manualPassKey = clientData?.fields["MANUAL_PASSKEY"];
      const clienId = clientData?.fields["Record_ID"];

      if (manualPassKey) {
        if (manualPassKey === savedToken) {
          setShowPopup(false);

          router.push(`/${client_name}/report/${client_id}`);
          toast.success("Key verified.");
        } else {
          setShowPopup(true);
          toast.error("Incorrect key. Please try again.");
        }
      } else {
        if (clienId === savedToken) {
          setShowPopup(false);

          router.push(`/${client_name}/report/${client_id}`);
          toast.success("Key verified.");
        } else {
          setShowPopup(true);
          toast.error("Incorrect key. Please try again.");
        }
      }
    } else {
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    toast.dismiss();
    setShowPopup(false);
  };

  function downloadPDF(profile) {
    setDownloading(true); // Start the download process

    const url = process.env.NEXT_PUBLIC_API_URL + "/api/generate-pdf";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profile }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.blob();
      })
      .then((blob) => {
        // Create a link element, set the href to the blob, and trigger a download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = `${clientData?.Client_Name} | Pikkal & Co.pdf`; // Set the file name for the download
        document.body.appendChild(a);

        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        a.remove();

        setDownloading(false); // Reset download status
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error downloading the PDF.");
        setDownloading(false); // Reset download status in case of error
      });
  }

  const getLinkedInUrl = (clientData) => {
    let url = clientData.Linkedin ?? "";
    if (url.search("https://") !== 0) {
      url = "https://" + url;
    }

    return url;
  };

  console.log("clientData", clientData)

  return (
    <section className="block pt-6 pb-2 leading-6 text-left bg-white text-neutral-800">
      <div className="px-4 mx-auto max-w-full text-left">
        <div className="flex flex-col lg:flex-row print-flex-row">
          <div className="w-full lg:w-1/3 flex justify-center pb-5">
            <div className="w-64 h-64 relative overflow-hidden rounded-full border-4 border-white shadow-xl">
              {profilePictureUrl && (
                <img
                  src={profilePictureUrl}
                  alt="alt"
                  className="rounded-full w-full h-full max-w-full object-cover object-center"
                  loading="lazy"
                />
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/3 lg:pl-4 flex flex-col justify-center">
            <p className="text-lg mt-2 text-slate-800">
              Introducing public speaker and thought leader...
            </p>

            <h1 className="text-5xl font-semibold text-zinc-800 my-2">
              {clientData?.Client_Name}
            </h1>
            <p className="text-lg mt-2 text-slate-800 font-semibold">
              {clientData?.Title}
            </p>

            <hr className="my-5"></hr>

            <div className="flex mb-3">
              {clientData && clientData.Linkedin ? (
                <Link
                  href={getLinkedInUrl(clientData)}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="flex items-center justify-center text-slate-100 bg-[#0E76A8]  border-[#0E76A8] font-semibold border-2 shadow hover:shadow-lg py-2 px-4 rounded transition duration-300 ease-in-out">
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
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="ml-2 hidden md:block">
                      Connect on LinkedIn
                    </span>
                  </button>
                </Link>
              ) : (
                <></>
              )}

              { clientData && clientData.Instagram ? (
                <Link
                  href={clientData.Instagram.trim()}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button
                    className="mx-5 flex items-center justify-center text-slate-100 font-semibold border-2 shadow hover:shadow-lg py-2 px-4 rounded transition duration-300 ease-in-out"
                    style={{
                      background: "linear-gradient(45deg, #fdf497, #fd5949, #d6249f, #285AEB)",
                      borderColor: "#c13584"
                    }}>
                    <Instagram />

                    <span className="ml-2 hidden md:block">
                      Instagram
                    </span>
                  </button>
                </Link>
              ) : (
                <></>
              )}

              {clientData && clientData.Twitter ? (
                <Link
                  href={clientData.Twitter.trim()}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button
                    className="bg-sky-400 hover:bg-sky-500 border-sky-400 hover:border-sky-500 flex items-center justify-center text-slate-100 font-semibold border-2 shadow hover:shadow-lg py-2 px-4 rounded transition duration-300 ease-in-out">
                    <Twitter />

                    <span className="ml-2 hidden md:block">
                      Twitter
                    </span>
                  </button>
                </Link>
              ) : (
                <></>
              )}
            </div>

            <div className="flex">
              <button
                onClick={handlePopupOpen}
                className="no-print flex mr-5 items-center justify-center text-slate-800 font-semibold border-2 border-slate-600 shadow hover:shadow-lg bg-white py-2 px-4 rounded transition duration-300 ease-in-out"
              >
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
                  className="lucide lucide-bar-chart-3"
                >
                  <path d="M3 3v18h18" />
                  <path d="M18 17V9" />
                  <path d="M13 17V5" />
                  <path d="M8 17v-3" />
                </svg>
                <span className="ml-2 hidden md:block ">Report</span>
              </button>

              {showPopup && (
                <ClientIDPopup
                  client_name={client_name}
                  manualPassKey={clientData["MANUAL_PASSKEY"] ?? ""}
                  client_id={client_id}
                  onClose={handlePopupClose}
                />
              )}

              <button
                className="no-print flex items-center justify-center disabled:opacity-50 mr-2 text-slate-800 font-semibold border-2 border-slate-600 shadow hover:shadow-lg bg-white py-2 px-4 rounded transition duration-300 ease-in-out"
                onClick={() => downloadPDF(`${client_name}`)}
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <Loader className="animate-spin" size={24} />
                    <span className="ml-2 hidden md:block">Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="" size={24} />
                    <span className="ml-2 hidden md:block">
                      {" "}
                      Download Profile
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Divider = () => (
  <hr className="my-5 border-0 h-1 bg-gradient-to-r from-transparent to-slate-400 rounded opacity-50" />
);

const ContentSection = ({ title, children }) => (
  <>
    <div className="mb-10">
      {title ? (
        <div className="px-4 mb-4 section-title">
          <SectionTitle text={title} />
        </div>
      ) : null}

      <div className="px-4">{children}</div>
    </div>
  </>
);

const ClientContact = ({ clientData, client_name }) => (
  <section className="block my-6 py-2 leading-6 text-left bg-gray-100 text-neutral-800">
    <div className="p-4 mx-auto max-w-full text-left">
      <div className="w-full lg:pl-4 justify-center">
        <p className="text-lg mt-2 text-slate-800">
          <span className="mr-2">
            Interested in{" "}
            <span className="font-semibold">{clientData?.Client_Name}</span>{" "}
            speaking on your podcast, offering comment for your article, or
            presenting at your event?
          </span>
          <a
            href="mailto:hello@pikkal.com"
            className="text-slate-600 hover:text-slate-800 underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  </section>
);
