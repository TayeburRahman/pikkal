import React from "react";

const SpeakerCardSkeleton = () => {
    return (
        <div className="group shadow-lg hover:shadow-2xl transition duration-500 ease-in-out flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden animate-pulse">
            <div className="relative h-full w-80 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl">
                <div className="relative w-full">
                    <div className="h-96 bg-gray-200 rounded-t-xl"></div>
                    <div className="absolute bottom-0 w-full p-4 pt-6">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                    </div>
                </div>

                <div className="flex flex-col py-6 px-4 bg-white rounded-b-xl">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
                </div>
            </div>
        </div>
    );
};

export default SpeakerCardSkeleton;
