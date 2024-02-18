import React from "react";

export default function SectionTitle({ text }) {
  // Function to generate a dynamic ID
  const generateId = (text) => {
    return `title-${text.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <section
      id={generateId(text)}
      className="block pt-12 pb-6 leading-6 text-left bg-white text-slate-800"
    >
      <div className="px-4 mx-auto max-w-full text-left">
        <div className="w-full justify-center pb-5">
          <h1 className="text-4xl lg:text-5xl text-left font-extrabold leading-tight tracking-tight mb-4">
            {text}
          </h1>
          <hr className="border-t-4 w-16 border-lime-300 ml-0" />
        </div>
      </div>
    </section>
  );
}

