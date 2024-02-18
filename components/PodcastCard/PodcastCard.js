import React from "react";
import Link from "next/link";


const PodcastCard = ({ podcast }) => {

    const heroImage = podcast["Podcast Hero attach"][0];
    const heroImageURL = heroImage ? (heroImage.thumbnails?.large?.url || heroImage.url) : "/no-image.png";
    const appleUrl = podcast["Apple URL"]
      ? podcast["Apple URL"]
      : (podcast["Rephonic_URL"] ?? "#");

    return (
      <div className="group shadow-lg hover:shadow-2xl transition duration-500 ease-in-out flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">
        <Link href={appleUrl} target="_blank" className="relative h-full w-60 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <div className="relative w-full">
            <div className="relative h-64 overflow-hidden">
              {/* Updated Image component to load eagerly */}
              <img
                src={heroImageURL}
                alt="Heather Hansen"
                className="transition w-full h-full duration-500 ease-in-out transform group-hover:scale-110 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition duration-500 ease-in-out"></div>
            </div>

            <div className="absolute bottom-0 w-full p-4 pt-8 bg-gradient-to-t from-black to-transparent">
              <h2 className="text-xl font-bold text-white">
                {podcast["Podcast_Name_uq"]}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    );
};

export default PodcastCard;
