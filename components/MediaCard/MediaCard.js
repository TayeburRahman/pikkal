/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from 'next/image';

const MediaCard = ({ images }) => {

    return (
        <>
            <div className="content-section ">
                <div className='mb-4 section-title'>
                    <section
                        className="block pt-12 pb-6 leading-6 text-left bg-white text-slate-800"
                    >
                        <div className="px-4 mx-auto max-w-full text-left">
                            <div className="w-full justify-center pb-5">
                                <h1 className="text-4xl lg:text-5xl text-left font-extrabold leading-tight tracking-tight mb-4">
                                    Media Pics
                                </h1>
                                <hr className="border-t-4 w-16 border-lime-300 ml-0" />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="flex flex-wrap justify-center">
                    {/* Map over bookings to create slides */}
                    {images.map((image, index) => (
                        <div key={image.id} >
                            <div className="group content-section shadow-lg hover:shadow-2xl transition duration-500 ease-in-out flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">
                                <div className="relative h-full w-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                    <div className="relative w-full">
                                        <div className="relative  overflow-hidden">

                                            <div key={image.id} className="keen-slider__slide">
                                                <div className="relative h-[40vh] w-full">
                                                    <img
                                                        src={image.url}
                                                        alt={`Slide ${index + 1}`}
                                                        layout="fill"
                                                        className="content-section transition duration-500 ease-in-out transform group-hover:scale-110 w-full h-full max-w-full object-cover"
                                                        loading="eager"
                                                    />
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 bg-slate-800 bg-opacity-30 group-hover:bg-opacity-10 transition duration-500 ease-in-out"></div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MediaCard;
