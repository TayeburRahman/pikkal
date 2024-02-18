import React from "react";
import 'keen-slider/keen-slider.min.css';

const MediaCardSkeleton = () => {
    return (
        <div className="group hover:cursor-grab flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">
            <div className="relative w-full rounded-xl">
                <div className="keen-slider gap-6">
                    {/* Placeholder for image slides */}
                    <div className="keen-slider__slide">
                        <div className="animate-pulse h-[50vh] w-full bg-slate-200 rounded-xl"></div>
                    </div>
                    <div className="keen-slider__slide">
                        <div className="animate-pulse h-[50vh] w-full bg-slate-200 rounded-xl"></div>
                    </div>
                    <div className="keen-slider__slide">
                        <div className="animate-pulse h-[50vh] w-full bg-slate-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaCardSkeleton;
