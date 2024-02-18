import React from "react";
import Image from 'next/image';

const ClientCard = () => {
    return (
        <div className="group flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">

            <section className="block pt-16 pb-2 leading-6 text-left bg-white text-neutral-800">
                <div className="px-4 mx-auto max-w-full text-left">
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-1/3 flex justify-center">
                            <div className="w-64 h-64 relative overflow-hidden rounded-full border-4 border-white shadow-xl">
                                <Image
                                    src="/blank-profile-pic.webp"
                                    alt="Client Image"
                                    layout="fill"
                                    className="rounded-full scale-105 object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-2/3 lg:pl-4 flex flex-col justify-center">
                            <h1 className="text-5xl font-semibold text-zinc-800 my-2">
                                Lars Antrack
                            </h1>
                            <p className="text-2xl text-zinc-800">
                                Pioneering Online Marketing Strategist
                            </p>
                            <div className="flex flex-wrap gap-1 my-2">
                                <span className="tag">-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ClientCard;
