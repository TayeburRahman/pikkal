import React from "react";
import Link from "next/link";

const SpeakerCard = ({ client }) => {
  return (
    <Link
      href={`/${client["SEO:Slug"]}`}
      className="group cursor-pointer shadow-lg hover:shadow-2xl transition duration-500 ease-in-out flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden"
    >
      <div className="relative h-full w-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
        <div className="relative w-full">
          <div className="relative h-96 overflow-hidden">
            <img
              src={client.Clientimg_attach[0]?.url ?? "/no-image.png"}
              alt={client.Client_Name}
              className="transition duration-500 ease-in-out transform group-hover:scale-110 object-cover h-full w-full"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition duration-500 ease-in-out"></div>
          </div>

          <div className="absolute bottom-0 w-full p-4 pt-6 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-xl font-bold text-white">
              {client.Client_Name}
            </h2>
          </div>
        </div>

        <div className="flex flex-col py-6 px-4 h-full bg-white rounded-b-xl">
          <p className="text-md text-slate-800">
            {client.Desc?.slice(0, 200) + "..."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SpeakerCard;
