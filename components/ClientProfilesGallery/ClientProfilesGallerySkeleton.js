export default function ClientProfilesGallerySkeleton() {
  return (
    <div className="w-full m-0 p-0 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item) => (
        <div className="w-full h-full m-0 mb-3 p-0" key={_item}>
          <div className="w-full h-full flex justify-center items-center flex-col m-0 p-0 box-border">
            <div className="h-[178px] w-[178px] bg-gray-200 rounded-full mb-4 animate-pulse"></div>

            <div className="w-[200px] max-w-full h-[25px] rounded-[35px] bg-gray-200 mb-2 animate-pulse"></div>

            <div className="w-[150px] max-w-full h-[17px] rounded-[35px] bg-gray-200 mb-2 animate-pulse"></div>

            <div className="w-[170px] max-w-full h-[17px] rounded-[35px] bg-gray-200 mb-2 animate-pulse"></div>

            <div className="w-[100px] max-w-full h-[17px] rounded-[35px] bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
