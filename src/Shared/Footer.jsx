import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300">
            <div className="container mx-auto py-10 px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-8">
                <div>
                    <div>
                        <span className="font-bold text-2xl text-blue-500">Task</span>
                        <span className="font-bold text-2xl text-yellow-500">Manager</span>
                    </div>
                    <p className="mt-2 text-sm">
                        Streamline your workflow and boost productivity with our efficient task management system.
                    </p>
                </div>
                <div>
                    <h6 className="text-lg font-semibold text-white">Services</h6>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#" className="hover:text-white">Task Tracking</a></li>
                        <li><a href="#" className="hover:text-white">Collaboration</a></li>
                        <li><a href="#" className="hover:text-white">Automation</a></li>
                        <li><a href="#" className="hover:text-white">Analytics</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-lg font-semibold text-white">Company</h6>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-lg font-semibold text-white">Follow Us</h6>
                    <div className="mt-4 flex space-x-4">
                        <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-500 transition">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-sky-400 transition">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-600 transition">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-pink-500 transition">
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 text-center py-4 text-sm">
                <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
