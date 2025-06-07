"use client";
import Link from "next/link";
import React, { useState } from "react";

export const LandingNavbar = () => {
  // State for dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="/" className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-green-400">CS-LMS</h2>
        </a>

        <div className="lg:hidden">
          <button
            id="menu-toggle"
            className="text-gray-800 focus:outline-none"
            onClick={toggleDropdown}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        <div className="lg:flex lg:items-center space-x-6">
          <a href="/" className="text-blue-600 font-medium hover:text-blue-800">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">
            About
          </a>
          <a href="/courses" className="text-gray-700 hover:text-blue-600">
            Courses
          </a>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
              <svg
                className="w-4 h-4 ml-1 inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 011.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown content */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                <Link
                  href={`/login/[slug]`}
                  as={`/login/principal`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Principal Login
                </Link>
                <Link
                  href={`/login/[slug]`}
                  as={`/login/hm`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  HM Login
                </Link>
                <Link
                  href={`/login/[slug]`}
                  as={`/login/teacher`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Teacher Login
                </Link>
                <Link
                  href="/404"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Student Login
                </Link>
              </div>
            )}
          </div>

          <a href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </a>
          <Link
            href={`/login/[slug]`}
            as={`/login/admin`}
            className="ml-4 bg-blue-600 text-white py-2 px-5 rounded hover:bg-blue-700 transition duration-200"
          >
            Admin Login<i className="fa fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isDropdownOpen ? "block" : "hidden"} px-4 pb-4`}
      >
        <a href="/" className="block py-2 text-blue-600 font-medium">
          Home
        </a>
        <Link href="/about" className="block py-2 text-gray-700">
          About
        </Link>
        <a href="/courses" className="block py-2 text-gray-700">
          Courses
        </a>

        <div className="py-2">
          <p className="text-gray-700 font-medium">Pages</p>
          <a
            href="/team"
            className="block px-2 py-1 text-gray-600 hover:text-blue-600"
          >
            Our Team
          </a>
          <a
            href="/testimonial"
            className="block px-2 py-1 text-gray-600 hover:text-blue-600"
          >
            Testimonial
          </a>
          <a
            href="/404"
            className="block px-2 py-1 text-gray-600 hover:text-blue-600"
          >
            404 Page
          </a>
        </div>

        <a href="/contact" className="block py-2 text-gray-700">
          Contact
        </a>
        <a
          href="#"
          className="block bg-blue-600 text-white text-center py-2 mt-2 rounded hover:bg-blue-700"
        >
          Join Now <i className="fa fa-arrow-right ml-2"></i>
        </a>
      </div>
    </nav>
  );
};
