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
        <p>Cleansing mind through art</p>
      </div>

      <div className="footer-number scroll-animate">
        <p>+91 9191919191</p>
      </div>

      <div className="footer-email scroll-animate">
        inhealarttherapy@gmail.com
      </div>

      <div className="footer-icons scroll-animate">
        <div className="icons">
          <img src="whatsapp.svg" alt="wa" />
        </div>
        <div className="icons">
          <img src="insta.svg" alt="in" />
        </div>
        <div className="icons">
          <img src="ln.png" alt="ic" />
        </div>
      </div>

      <div className="copyright scroll-animate">
        2025, Inheal, All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
