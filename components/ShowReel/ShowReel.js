/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from 'next/image';
import { Youtube } from 'lucide-react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Link from "next/link";

const ShowReel = ({ videos }) => {
    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,
            spacing: 15,
        },
        breakpoints: {
            '(min-width: 768px)': {
                slides: {
                    perView: 2,
                    spacing: 15,
                },
            },
            '(min-width: 1024px)': {
                slides: {
                    perView: 3,
                    spacing: 15,
                },
            },
        },
    });

    // State to handle video modal open/close
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Function to render thumbnail or fallback icon
    const renderThumbnail = (video) => {
        
        if (video.fields.THUMB && video.fields.THUMB.length > 0 && video.fields.THUMB[0].thumbnails) {
            return (
                <img
                    src={video.fields.THUMB[0].thumbnails.large.url}
                    alt={video.fields["Video Name"]}
                    layout="fill"
                    className="content-section transition duration-500 ease-in-out transform w-full h-full max-w-full object-cover"
                    loading="eager"
                    priority=""
                />
            );
        } else {
            // Return YouTube icon as fallback
            return <Youtube size={64} className="mx-auto" color="red" />;
        }
    };

    return (
        <>

            <div className="content-section flex flex-wrap justify-center">
                {videos && videos.map((video) => (
                    <div key={video.id} >
                        <div className="group shadow-lg hover:shadow-2xl transition duration-500 ease-in-out flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">
                            <div className="relative h-full w-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                <div className="relative w-full">
                                    <div className="relative  overflow-hidden">


                                        <div className="content-section relative h-40 w-full flex items-center justify-center">
                                            {renderThumbnail(video)}
                                        </div>


                                        <div className="absolute inset-0 bg-slate-800 bg-opacity-30 group-hover:bg-opacity-10 transition duration-500 ease-in-out"></div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between py-6 h-full px-4 bg-white rounded-b-xl shadow-md">
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{video.fields["Video Name"]}</h3>
                                        <p className="text-sm text-gray-600">Hosted by {video.fields["Lookup Client Name"]}</p>
                                        <button
                                            className="mt-4 print-display-none bg-black text-white text-sm font-bold py-2 px-4 rounded"
                                            onClick={() => setSelectedVideo(video.fields["Video_Embed"])}
                                        >
                                            Watch Video
                                        </button>

                                        <Link
                                            className="mt-4 hidden print-display-block bg-black text-white text-sm font-bold py-2 px-4 rounded"
                                            href={video.fields["Video URL"]}
                                        >
                                            Watch Video
                                        </Link>
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Video Modal - shown when a video is selected */}
                        {selectedVideo && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-4 rounded-xl">
                                    {/* Embed YouTube video */}
                                    <div dangerouslySetInnerHTML={{ __html: selectedVideo }} />
                                    <button
                                        className="bg-red-500 text-white p-2 rounded mt-4"
                                        onClick={() => setSelectedVideo(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>


                ))}
            </div>
        </>
    );
};

export default ShowReel;
