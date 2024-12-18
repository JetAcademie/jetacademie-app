import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/jet logo.jpg";
import Dropdown from "../../components/Dropdown";
import NavigationItem from "../../components/NavigationItem";
import { libraryCategories, mentoringGrades } from "../../data/data";
import AdminModal from "../../components/AdminModal";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const handleDropdownClick = (dropdownName, link) => {
    if (location.pathname !== link) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    }
  };

  return (
      <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-24 text-white shadow-lg fixed top-0 w-full z-50 mb-16">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full border-2 border-white" />
            <span className="text-2xl font-bold ml-3">Jet Academy</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="flex items-center space-x-6 ml-auto"> {/* Links tamamen sağda */}
            <ul className="hidden md:flex space-x-6">
              <NavigationItem to="/" icon={HomeIcon} label="Ana Sayfa" />
              <li className="relative">
                <NavigationItem
                    to="/library"
                    icon={BookOpenIcon}
                    label="Digital Kütüphane"
                    onClick={() => handleDropdownClick("library", "/library")}
                />
                <Dropdown
                    isOpen={openDropdown === "library" && location.pathname === "/library"}
                    items={libraryCategories}
                    baseLink="/library"
                />
              </li>
              <li className="relative">
                <NavigationItem
                    to="/mentoring"
                    icon={ChatBubbleLeftRightIcon}
                    label="Mentorluk"
                    onClick={() => handleDropdownClick("mentoring", "/mentoring")}
                />
                <Dropdown
                    isOpen={openDropdown === "mentoring" && location.pathname === "/mentoring"}
                    items={mentoringGrades}
                    baseLink="/mentoring"
                />
              </li>
              <NavigationItem to="/contact" icon={EnvelopeIcon} label="İrtibat" />
            </ul>

            {/* Admin Icon */}
            <AdminModal />
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
