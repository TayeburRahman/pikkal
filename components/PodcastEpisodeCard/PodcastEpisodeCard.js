import React from "react";
import Image from "next/image";
import { Headphones, Speaker } from "lucide-react";

const PodcastEpisodeCard = ({ bookings }) => {

    const getThumbnail = (booking) => {
        const attachments = booking.fields["Lookup Hero Img Attach"];

        if (
            attachments &&
            attachments.length > 0 &&
            attachments[0].thumbnails &&
            attachments[0].thumbnails.large &&
            attachments[0].thumbnails.large.url
        ) {
            return booking.fields["Lookup Hero Img Attach"][0].thumbnails.large.url;
        } else {
            return "/no-image.png";
        }
    }

    const getWidth = (booking) => {
        const attachments = booking.fields["Lookup Hero Img Attach"];

        if (
            attachments &&
            attachments.length > 0 &&
            attachments[0].width
        ) {
            return booking.fields["Lookup Hero Img Attach"][0].width;
        } else {
            return 178;
        }
    }

    const getHeight = (booking) => {
        const attachments = booking.fields["Lookup Hero Img Attach"];

        if (
            attachments &&
            attachments.length > 0 &&
            attachments[0].height
        ) {
            return booking.fields["Lookup Hero Img Attach"][0].height;
        } else {
            return 178;
        }
    }

  return (
    <>
      <div className="content-section flex flex-wrap justify-center">
        {/* Map over bookings to create slides */}
        {bookings &&
          bookings.map((booking) => (
            <div key={booking.id}>
              <div className="group shadow-lg hover:shadow-2xl transition duration-500 ease-in-out flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">
                <div className="relative h-full w-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                  <div className="relative w-full">
                    <div className="relative  overflow-hidden">
                      <img
                        src={getThumbnail(booking)}
                        alt={booking.fields["Lookup Podcast Name"]}
                        width={getWidth(booking)}
                        height={getHeight(booking)}
                        className="content-section transition duration-500 ease-in-out transform group-hover:scale-110"
                        loading="eager"
                      />

                      <div className="absolute inset-0 bg-slate-800 bg-opacity-30 group-hover:bg-opacity-10 transition duration-500 ease-in-out"></div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between py-6 px-4 bg-white rounded-b-xl shadow-md min-h-40 h-auto">
                    <h2 className="text-xl font-semibold text-slate-800">
                      {booking.fields["Lookup Podcast Name"]}
                    </h2>

                    {/* Spacer to push the button to the bottom */}
                    <div className="flex-grow"></div>

                    <a
                      href={booking.fields["Lookup Apple Link"]}
                      className="flex items-center justify-center text-slate-700 text-sm font-medium py-2 px-4 bg-slate-100 rounded hover:bg-slate-200 transition-all duration-300 ease-in-out mt-4"
                    >
                      <Headphones className="mr-2 text-slate-600" />
                      Listen on Apple Podcasts
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PodcastEpisodeCard;
