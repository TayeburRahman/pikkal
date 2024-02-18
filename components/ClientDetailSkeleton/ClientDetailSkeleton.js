import React from "react";

const ClientDetailSkeleton = () => {
  return (
    <div className="group flex flex-col max-w-full lg:max-w-1/3 md:max-w-1/2 sm:max-w-full m-4 text-left text-neutral-800 rounded-xl overflow-hidden">
      <div className="block pt-2 pb-2 leading-6 text-left bg-white text-neutral-800">
        <div className="px-4 mx-auto max-w-full text-left">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 flex justify-center pb-10">
              {/* Skeleton for the image */}
              <div className="w-64 h-64 bg-slate-200 animate-pulse rounded-full"></div>
            </div>
            <div className="w-full lg:w-2/3 lg:pl-4 flex flex-col justify-center">
              {/* Skeleton for the title */}
              <div className="h-12 bg-slate-200 animate-pulse my-2 rounded"></div>
              {/* Skeleton for the email */}
              <div className="h-8 bg-slate-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ClientDetailSkeleton;
