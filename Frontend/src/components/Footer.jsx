import React from 'react'
import logo from "../assets/logo.png"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import qrcode from "../assets/qr-code.jpg"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 px-4 md:px-16">
            <div className="w-full text-white py-8">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Logo & Description */}
                    <div className="flex flex-col items-center md:items-start">
                        <img src={logo} alt="Brand Logo" className="w-48 object-left-top object-cover" />
                        <p className="text-sm text-gray-300 text-center md:text-left">
                            Your trusted brand for quality products and services. Stay connected with us!
                        </p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="SOCIAL_LINK" className="text-gray-300 hover:text-white text-2xl"><FaFacebook/></a>
                            <a href="SOCIAL_LINK" className="text-gray-300 hover:text-white text-2xl"><FaInstagram/></a>
                            <a href="SOCIAL_LINK" className="text-gray-300 hover:text-white text-2xl"><FaXTwitter/></a>
                            <a href="SOCIAL_LINK" className="text-gray-300 hover:text-white text-2xl"><FaLinkedin/></a>
                        </div>
                    </div>

                    {/* QR Code & Contact Info */}
                    <div className="flex flex-col items-center md:items-end">
                        <h3 className="text-lg font-semibold mb-3">Download Our App</h3>
                        <img src={qrcode} alt="QR Code" className="w-24 mb-3" />
                        <p className="text-sm text-gray-300 text-center md:text-right">
                            Scan the QR code to install our app for a seamless experience.
                        </p>
                        <h3 className="text-lg font-semibold mt-4">Contact Us</h3>
                        <p className="text-sm text-gray-300">Email: support@gogrocer.com</p>
                        <p className="text-sm text-gray-300">Phone: +123 456 7890</p>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-700 pt-4">
                    © {new Date().getFullYear()} GoGrocer. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
