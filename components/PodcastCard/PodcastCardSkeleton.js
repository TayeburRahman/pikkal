import React from "react";
import Image from 'next/image';


const PodcastCardSkeleton = () => {

    return (
        <div className="group shadow-lg hover:shadow-2xl transition duration-500 ease-in-out flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">

            <div className="relative h-full w-60 bg-slate-200 animate-pulse rounded-xl">
                <div className="relative w-full">
                    <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-slate-100 bg-opacity-30 group-hover:bg-opacity-10 transition duration-500 ease-in-out"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PodcastCardSkeleton;
