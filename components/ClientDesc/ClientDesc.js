import Link from 'next/link';
import React from 'react';
import Markdown from 'react-markdown'

const ClientDesc = ({ data, linkedin }) => {
    return (
        <section className="block leading-6 text-left bg-white text-neutral-800 html-content">
            <div className="px-4 mx-auto w-full max-w-full text-left">
                <div className="text-neutral-800">

                    <div className="flex justify-center w-full" style={{ flexFlow: "wrap" }}>
                        <div className="text-lg font-normal tracking-normal  text-zinc-800">
                            <div className="mt-0">
                                <Markdown>{data}</Markdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default ClientDesc;
