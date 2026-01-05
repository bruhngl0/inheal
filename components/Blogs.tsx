"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/blogs.scss";

const Blogs = () => {
  // NEW: State to track which elements are revealed
  const [isTitleRevealed, setIsTitleRevealed] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Update React state instead of manual class addition
          if (entry.target === titleRef.current) setIsTitleRevealed(true);
          if (entry.target === cardRef.current) setIsCardRevealed(true);
        }
      });
    }, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="blogs-main">
      <h1
        ref={titleRef}
        className={`scroll-animate ${isTitleRevealed ? "animate-in" : ""}`}
      >
        Blogs
      </h1>

      <div
        ref={cardRef}
        className={`blogs-img-container scroll-animate ${isCardRevealed ? "animate-in" : ""}`}
      >
        <img src="rectangle.png" alt="blogs" className="blogs-img-img" />
        <p>Know About Art Therapy</p>
      </div>
      <div></div>
    </div>
  );
};

export default Blogs;
