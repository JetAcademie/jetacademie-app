import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/jet logo.jpg';
import Dropdown from '../../components/Dropdown';
import NavigationItem from '../../components/NavigationItem';
import { libraryCategories, mentoringGrades } from '../../data/data';
import AdminModal from '../../components/AdminModal';

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleDropdownClick = (dropdownName, link) => {
    if (location.pathname !== link) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    }
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-20 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="text-xl md:text-2xl font-bold ml-3">
            Jet Academy
          </span>
        </a>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-4 text-sm lg:text-base">
            <NavigationItem to="/" icon={HomeIcon} label="Ana Sayfa" />
            <li className="relative">
              <NavigationItem
                to="/library"
                icon={BookOpenIcon}
                label="Digital Kütüphane"
                onClick={() => handleDropdownClick('library', '/library')}
              />
              <Dropdown
                isOpen={
                  openDropdown === 'library' && location.pathname === '/library'
                }
                items={libraryCategories}
                baseLink="/library"
              />
            </li>
            <li className="relative">
              <NavigationItem
                to="/mentoring"
                icon={() => (
                  <ChatBubbleLeftRightIcon className="h-4 w-4 text-white" />
                )}
                label="Mentorluk"
                onClick={() => handleDropdownClick('mentoring', '/mentoring')}
              />
              <Dropdown
                isOpen={
                  openDropdown === 'mentoring' &&
                  location.pathname === '/mentoring'
                }
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <ul className="space-y-4 px-6 py-4 text-sm">
            <li onClick={handleMobileNavClick}>
              <NavigationItem to="/" icon={HomeIcon} label="Ana Sayfa" />
            </li>
            <li onClick={handleMobileNavClick}>
              <NavigationItem
                to="/library"
                icon={BookOpenIcon}
                label="Digital Kütüphane"
              />
            </li>
            <li onClick={handleMobileNavClick}>
              <NavigationItem
                to="/mentoring"
                icon={() => (
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-white inline-block" />
                )}
                label="Mentorluk"
              />
            </li>
            <li onClick={handleMobileNavClick}>
              <NavigationItem
                to="/contact"
                icon={EnvelopeIcon}
                label="İrtibat"
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
