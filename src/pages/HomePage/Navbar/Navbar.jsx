import { useState } from "react";
import { HomeIcon, BookOpenIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
      <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg fixed top-0 w-full z-50 mb-16">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
                src="src/assets/jet%20logo.jpg"
                alt="Logo"
                className="w-12 h-12 rounded-full border-2 border-white"
            />
            <span className="text-2xl font-bold ml-3">Jet Academy</span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-6 relative">
            <li className="flex items-center space-x-2">
              <HomeIcon className="h-5 w-5 text-white" />
              <Link to="/" className="hover:text-blue-300 transition duration-300">
                Home
              </Link>
            </li>
            <li className="relative">
              <button
                  onClick={() => setOpenDropdown(openDropdown === "library" ? null : "library")}
                  className="flex items-center space-x-2 hover:text-blue-300 transition duration-300 focus:outline-none"
              >
                <BookOpenIcon className="h-5 w-5 text-white" />
                <Link to="/library" className="hover:text-blue-300 transition duration-300">
                  Digital Library
                </Link>
              </button>
              {openDropdown === "library" && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50 transform transition-all duration-300 scale-100 opacity-100">
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/library/category1">Educational Books</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/library/category2">Historical Works</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/library/category3">Art Works</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/library/category4">Knowledge Books</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/library/category5">Biography Books</Link>
                    </li>
                  </ul>
              )}
            </li>
            <li className="relative">
              <button
                  onClick={() => setOpenDropdown(openDropdown === "mentoring" ? null : "mentoring")}
                  className="flex items-center space-x-2 hover:text-blue-300 transition duration-300 focus:outline-none"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
                <Link to="/mentoring" className="hover:text-blue-300 transition duration-300">
                  Mentoring
                </Link>
              </button>
              {openDropdown === "mentoring" && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50 transform transition-all duration-300 scale-100 opacity-100">
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/mentoring/session1">Grade 6</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/mentoring/session2">Grade 7</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/mentoring/session3">Grade 8</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/mentoring/session4">Grade 9</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/mentoring/session5">Grade 10</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/mentoring/session6">Grade 11</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/mentoring/session7">Grade 12</Link>
                    </li>
                  </ul>
              )}
            </li>
            <li className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-white" />
              <Link
                  to="/contact"
                  className="hover:text-blue-300 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>

          <button
              onClick={() => setOpenDropdown(openDropdown === "mobile" ? null : "mobile")}
              className="block md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {openDropdown === "mobile" && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center space-y-4 text-lg">
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
              <Link to="/library" className="hover:text-blue-400">
                Digital Library
              </Link>
              <Link to="/mentoring" className="hover:text-blue-400">
                Mentoring
              </Link>
              <Link to="/contact" className="hover:text-blue-400">
                Contact
              </Link>
              <button
                  onClick={() => setOpenDropdown(null)}
                  className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
        )}
      </nav>
  );
}

export default Navbar;
