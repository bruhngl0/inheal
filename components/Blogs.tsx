"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/blogs.scss";

const Blogs = () => {
  // NEW: State to track which elements are revealed
  const [isTitleRevealed, setIsTitleRevealed] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

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
        What is Art Therapy?
      </h1>

      <div
        ref={cardRef}
        className={`blogs-img-container scroll-animate ${isCardRevealed ? "animate-in" : ""}`}
      >
        {!isPlaying ? (
          <div className="blogs-video-thumbnail" onClick={() => setIsPlaying(true)}>
            <img src="rectangle.png" alt="Play Video" className="blogs-img-img" />
            <div className="play-button">
              <svg viewBox="0 0 24 24" fill="currentColor" height="64" width="64">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ) : (
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/WCMcsA5Ic8c?autoplay=1"
            title="What is Art Therapy?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="blogs-video"
          ></iframe>
        )}
        <p>Know About Art Therapy</p>
      </div>
      <div></div>
    </div>
  );
};

export default Blogs;
