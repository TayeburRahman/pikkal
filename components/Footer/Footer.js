// components/Footer.js

const Footer = () => {
    return (
        <div className="bg-black text-gray-300 no-print">
            <footer className="max-w-7xl mx-auto py-10 px-8 lg:px-24">
                <div className="xl:flex xl:items-center xl:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        {/* Social Media Icons */}
                        <a href="#" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">Facebook</span>
                            {/* Facebook Icon */}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">Instagram</span>
                            {/* Instagram Icon */}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">Twitter</span>
                            {/* Twitter Icon */}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">GitHub</span>
                            {/* GitHub Icon */}
                        </a>
                    </div>
                    <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                        &copy; 2023 Pikkal & Co Ltd. All rights reserved
                    </p>
                </div>
                <hr className="my-6 border-gray-700" />
                <div className="md:flex md:justify-between">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        {/* Additional content or links here */}
                    </div>
                    <div className="md:w-1/2">
                        {/* Newsletter subscription form or additional links */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
