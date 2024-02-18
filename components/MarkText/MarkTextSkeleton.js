import React from "react";

const MarkTextSkeleton = () => {
  return (
    <section className="block py-8 leading-6 text-left bg-white text-neutral-800">
      <div className="px-4 mx-auto w-full max-w-full text-left">
        <div className="text-neutral-800">
          <div className="flex justify-center w-full" style={{ flexFlow: "wrap" }}>
            <div className="flex-row flex-grow-0 m-0 max-w-full xl:max-w-full xl:flex-grow-0 xl:basis-full sm:max-w-full sm:flex-grow-0 sm:basis-full md:max-w-full md:flex-grow-0 md:basis-full lg:max-w-full lg:flex-grow-0 lg:basis-full basis-full">
              <div className="flex ml-0 w-full sm:flex-col md:flex-row" style={{ flexFlow: "column" }}>
                <div className="flex flex-col w-full sm:pl-0 md:pl-0">
                  {/* Skeleton for Markdown content */}
                  <div className="h-6 bg-slate-200 animate-pulse rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-slate-200 animate-pulse rounded w-full mb-4"></div>
                  <div className="h-6 bg-slate-200 animate-pulse rounded w-5/6 mb-4"></div>
                  <div className="h-6 bg-slate-200 animate-pulse rounded w-2/3 mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarkTextSkeleton;
