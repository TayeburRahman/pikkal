import React from "react";
import Image from 'next/image';

export default function Navbar() {
    return (
        <div className="bg-black opacity-100 no-print">
            <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-8 lg:px-24">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <div className="relative  w-full max-w-xs mr-3">
                        <Image
                            src="/pikkal-logo.jpeg"
                            alt="Logo"
                            width={160}
                            height={120}
                            className=""
                        />
                    </div>
                </a>

                {/* Navigation Links */}
                <div className="hidden lg:flex space-x-4">
                    <a
                        href="/"
                        className="py-2 px-3 text-white text-sm lg:text-base font-medium rounded transition duration-300"
                    >
                        HOME
                    </a>
                    <a
                        href="https://www.pikkal.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 text-white text-sm lg:text-base font-medium rounded transition duration-300"
                    >
                        CONTACT
                    </a>
                </div>
            </nav>
        </div>
    );
}
