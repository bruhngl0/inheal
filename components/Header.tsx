"use client";

import { useState, useEffect, useRef } from "react";
import "../styles/header.scss";
import Link from "next/link";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const services = [
    { name: "Consultation", href: "#book" },
    { name: "Therapy Session", href: "#book" },
    { name: "Coaching", href: "#book" },
    { name: "Workshop", href: "#book" },
  ];

  return (
    <div className="header">
      <div className="header-content">
        {/* Desktop Left Navigation - Services and About Us */}
        <nav className="header-nav header-nav-left">
          <Link href="#book" className="header-nav-link">Services</Link>
          <Link href="#about" className="header-nav-link">About Us</Link>
        </nav>

        {/* Logo - Centered on both mobile and desktop */}
        <Link href="/" className="header-logo-container">
          <img src="/logo.png" className="header-logo" alt="Inheal Logo" />
        </Link>

        {/* Desktop Right Navigation - Contact Us and Book a session */}
        <nav className="header-nav header-nav-right">
          <Link href="#contact" className="header-nav-link">Contact Us</Link>
          <Link href="#book" className="header-nav-link">Book a session</Link>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div className="header-mobile-menu" ref={dropdownRef}>
          <button
            className="header-mobile-menu-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Toggle services menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="#2C3E50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="header-mobile-dropdown">
              <div className="header-mobile-dropdown-header">Services</div>
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="header-mobile-dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
              <div className="header-mobile-dropdown-divider"></div>
              <Link
                href="#about"
                className="header-mobile-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="#contact"
                className="header-mobile-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="#book"
                className="header-mobile-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Book a session
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
