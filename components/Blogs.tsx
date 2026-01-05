"use client";

import { useEffect, useRef } from "react";
import "../styles/blogs.scss";

const Blogs = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="blogs-main">
      <h1 ref={titleRef} className="scroll-animate">
        Blogs
      </h1>

      <div ref={cardRef} className="blogs-img-container scroll-animate">
        <img src="rectangle.png" alt="blogs" className="blogs-img-img" />
        <p>Know About Art Therapy</p>
      </div>
      <div></div>
    </div>
  );
};

export default Blogs;
