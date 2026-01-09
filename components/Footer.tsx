"use client";

import { useEffect, useRef } from "react";
import "../styles/footer.scss";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find all animatable children and trigger them
          const elements = entry.target.querySelectorAll(".scroll-animate");
          elements.forEach((el) => el.classList.add("animate-in"));
        }
      });
    }, observerOptions);

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="footer-main" ref={footerRef}>
      <div className="footer-logo scroll-animate">
        <img src="logo-footer.png" alt="footer" />
      </div>

      <div className="footer-des scroll-animate">
        <p>Healing Through Art</p>
      </div>

      <div className="footer-number scroll-animate">
        <a href="tel:+919148874678" style={{ color: 'inherit', textDecoration: 'none' }}>
          <p>91488 74678</p>
        </a>
      </div>

      <div className="footer-email scroll-animate">
        <a href="mailto:Inheal.art@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
          Inheal.art@gmail.com
        </a>
      </div>

      <div className="footer-icons scroll-animate">
        <div className="icons">
          <a href="https://wa.me/919148874678" target="_blank" rel="noopener noreferrer">
            <img src="whatsapp.svg" alt="wa" />
          </a>
        </div>
        <div className="icons">
          <a href="https://www.instagram.com/inheal.art?igsh=dGtodXpzZXNscmN6" target="_blank" rel="noopener noreferrer">
            <img src="insta.svg" alt="in" />
          </a>
        </div>
        <div className="icons">
          <a href="https://www.linkedin.com/in/parita-kanunga-985389200?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
            <img src="ln.png" alt="ic" />
          </a>
        </div>
      </div>

      <div className="copyright scroll-animate">
        2025, Inheal, All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
