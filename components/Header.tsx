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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDropdownOpen]);

  return (
    <div className="header">
      <div className="header-content">
        {/* Desktop Left Navigation - Services and About Us */}
        <nav className="header-nav header-nav-left">
          <Link href="#book" className="header-nav-link">
            Services
          </Link>
          <Link href="#about" className="header-nav-link">
            About Us
          </Link>
        </nav>

        {/* Logo - Centered on both mobile and desktop */}
        <Link href="/" className="header-logo-container">
          <img src="/logo.png" className="header-logo" alt="Inheal Logo" />
        </Link>

        {/* Desktop Right Navigation - Contact Us and Book a session */}
        <nav className="header-nav header-nav-right">
          <Link href="#contact" className="header-nav-link">
            Contact Us
          </Link>
          <Link href="#book" className="header-nav-link">
            Book a session
          </Link>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div className="header-mobile-menu" ref={dropdownRef}>
          <button
            className={`header-mobile-menu-button ${isDropdownOpen ? "open" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Toggle services menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div
            className={`header-mobile-dropdown ${isDropdownOpen ? "open" : ""}`}
          >
            <div className="dropdown-content">
              <div className="header-mobile-dropdown-divider"></div>

              <Link
                href="#about"
                className="header-mobile-dropdown-item main-item"
                onClick={() => setIsDropdownOpen(false)}
                style={{ animationDelay: "0.2s" }}
              >
                About Us
              </Link>
              <Link
                href="#contact"
                className="header-mobile-dropdown-item main-item"
                onClick={() => setIsDropdownOpen(false)}
                style={{ animationDelay: "0.25s" }}
              >
                Contact Us
              </Link>
              <Link
                href="#book"
                className="header-mobile-dropdown-item cta-item"
                onClick={() => setIsDropdownOpen(false)}
                style={{ animationDelay: "0.3s" }}
              >
                Book a session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
