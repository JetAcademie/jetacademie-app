import { useState } from "react";
import { HomeIcon, BookOpenIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/jet logo.jpg";
import { libraryCategories, mentoringGrades } from "../../data/data";
import ListItem from "../../components/ListItem";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation(); // Mevcut sayfa URL'ini almak için

  // Dropdown'u açma mantığı
  const handleDropdownClick = (dropdownName, link) => {
    if (location.pathname !== link) {
      // Eğer kullanıcı şu an sayfada değilse, sayfaya yönlendirme yap
      setOpenDropdown(null); // Tüm dropdownları kapat
    } else {
      // Eğer kullanıcı şu an sayfadaysa, dropdown menüyü aç/kapat
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    }
  };

  return (
      <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg fixed top-0 w-full z-50 mb-16">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 rounded-full border-2 border-white"
            />
            <span className="text-2xl font-bold ml-3">Jet Academy</span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-6 relative">
            <li className="flex items-center space-x-2">
              <HomeIcon className="h-5 w-5 text-white" />
              <Link to="/" className="text-white hover:bg-purple-600 px-2 py-1 rounded transition duration-300">
                Ana Sayfa
              </Link>
            </li>

            {/* Digital Library Dropdown */}
            <li className="relative">
              <Link
                  to="/library"
                  onClick={() => handleDropdownClick("library", "/library")}
                  className="flex items-center space-x-2 hover:text-blue-300 transition duration-300 focus:outline-none"
              >
                <BookOpenIcon className="h-5 w-5 text-white" />
                <span className="text-white hover:bg-purple-600 px-2 py-1 rounded transition duration-300">
                Digital Kütüphane
              </span>
              </Link>
              {openDropdown === "library" && location.pathname === "/library" && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
                    {libraryCategories.map((category, index) => (
                        <ListItem key={index} to={category.link} label={category.title} />
                    ))}
                  </ul>
              )}
            </li>

            {/* Mentoring Dropdown */}
            <li className="relative">
              <Link
                  to="/mentoring"
                  onClick={() => handleDropdownClick("mentoring", "/mentoring")}
                  className="flex items-center space-x-2 hover:text-blue-300 transition duration-300 focus:outline-none"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
                <span className="text-white hover:bg-purple-600 px-2 py-1 rounded transition duration-300">
                Mentorluk
              </span>
              </Link>
              {openDropdown === "mentoring" && location.pathname === "/mentoring" && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
                    {mentoringGrades.map((grade, index) => (
                        <ListItem key={index} to={grade.link} label={grade.title} />
                    ))}
                  </ul>
              )}
            </li>

            <li className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-white" />
              <Link to="/contact" className="text-white hover:bg-purple-600 px-2 py-1 rounded transition duration-300">
                İrtibat
              </Link>
            </li>
          </ul>
        </div>
      </nav>
  );
}

export default Navbar;
