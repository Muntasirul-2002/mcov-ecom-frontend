import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="bg-white rounded-lg text-black m-4">
        <div className="w-full  mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-20 w-20" alt="Mcov. Logo" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link to="/oops" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline me-4 md:me-6">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 . Design and Developed by{" "}
            <a href="https://muntasirul.vercel.app" target="_blank" className="underline text-blue-500">
              Muntasirul
            </a>{" "}
            .
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
