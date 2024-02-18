import Link from 'next/link';
import React from 'react';
import Markdown from 'react-markdown'
import DOMPurify from 'dompurify';

const MarkText = ({ data }) => {

    // Check if the data contains HTML tags
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(data);

    let finalData = '';

    if (isHtml) {
        // If it's HTML, sanitize and render it
        const cleanHtml = DOMPurify.sanitize(data);
        finalData = <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
    } else {
        // If it's Markdown, render it with react-markdown
        finalData = <Markdown>{data}</Markdown>;
    }

    return (
        <section className="block leading-6 text-left bg-white text-neutral-800 html-content">
            <div className="mx-auto w-full max-w-full text-left">
                <div className="text-neutral-800">

                    <div className="flex justify-center w-full" style={{ flexFlow: "wrap" }}>
                        <div className="flex-row flex-grow-0 m-0 max-w-full xl:max-w-full xl:flex-grow-0 xl:basis-full sm:max-w-full sm:flex-grow-0 sm:basis-full md:max-w-full md:flex-grow-0 md:basis-full lg:max-w-full lg:flex-grow-0 lg:basis-full basis-full">
                            <div className="flex flex-col" style={{ flexDirection: "column" }}>
                                <div className="flex overflow-hidden w-full" style={{ wordBreak: "break-word", justifyContent: "left" }}>
                                    <div className="w-auto h-full" style={{ wordBreak: "break-word" }}>
                                        <div className="p-0 my-0 text-lg font-normal tracking-normal leading-9 text-zinc-800">
                                            <div className="mt-0 pb-2">
                                                {finalData}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarkText;
