import Link from "next/link";
import Image from "next/image";
import "./ClientProfilesGallery.scss";

export default function ClientProfilesGallery({ clients }) {
  if (!clients || (clients && clients.length === 0)) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <h3 className="text-slate-300 uppercase">No Profiles</h3>
      </div>
    );
  }

  return (
    <div className="w-full m-0 p-0 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
      {clients.filter((client) => {
        return !(
          !client ||
          !client?.fields ||
          !client?.fields?.["SEO:Slug"] ||
          !client?.fields?.Clientimg_attach ||
          client?.fields?.Clientimg_attach?.length === 0 ||
          !client?.fields?.Client_Name
        )
      }).map((client, index) => (
        <div className="w-full h-full m-0 mb-6 p-0 single-client" key={index}>
          <div className="w-full h-full flex justify-start items-center flex-col m-0 p-0 box-border">
            <Link
              href={`/profiles/${client?.fields?.["SEO:Slug"]}`}
              className="h-[178px] w-[178px] bg-gray-200 rounded-full mb-4 shadow-md hover:shadow-lg transition hover:scale-[1.1] duration-[500] overflow-hidden flex flex-col justify-center items-center cursor-pointer"
            >
              <img
                src={client?.fields?.Clientimg_attach[0]?.url || ""}
                alt={client?.fields?.Client_Name || ""}
                className="rounded-full w-full h-full max-w-full object-cover object-center"
                loading="eager"
                draggable={false}
              />
            </Link>

            <Link
              href={`/profiles/${client?.fields?.["SEO:Slug"]}`}
              className="w-auto text-center max-w-full transition duration-500 cursor-pointer hover:text-blue-500"
            >
              {client?.fields?.Client_Name && (
                <h2 className="text-2xl font-semibold text-zinc-800 text-center w-full mb-1">
                  {client.fields.Client_Name}
                </h2>
              )}
            </Link>

            <div className="w-auto text-center max-w-full flex justify-center items-center">
              {client?.fields?.Title && (
                <p className="text-sm mt-2 text-slate-500 font-semibold text-center max-w-[80%] mx-auto">
                  {client.fields.Title}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
