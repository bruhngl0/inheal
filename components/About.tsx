"use client";
import { useState, useEffect, useRef } from "react";
import "../styles/about.scss";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const readMoreRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe desktop elements
    if (imgRef.current) observer.observe(imgRef.current);
    if (headRef.current) observer.observe(headRef.current);
    if (text1Ref.current) observer.observe(text1Ref.current);
    if (text2Ref.current) observer.observe(text2Ref.current);
    if (readMoreRef.current) observer.observe(readMoreRef.current);
    if (decorRef.current) observer.observe(decorRef.current);
    if (lineRef.current) observer.observe(lineRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop Version */}
      <div className="about-pc">
        <div className="about-pc-img">
          <img
            ref={imgRef}
            src="/parioo.png"
            alt="about"
            className="about-pc-img-img scroll-animate"
            onError={(e) => {
              e.currentTarget.src = "./parioo.png";
            }}
            loading="eager"
          />
        </div>
        <div className="about-pc-des">
          <div ref={headRef} className="about-pc-des-head scroll-animate">
            <h1>Hello, I am Parita. </h1>
          </div>
          <div className="about-pc-des-text">
            <p
              ref={text1Ref}
              className="about-pc-des-text-p1 scroll-animate"
              style={{ animationDelay: "0.1s" }}
            >
              Art has always been my way of making sense of the world, a
              language of colours, symbols, and metaphor that helped me express
              what words alone could not. Over time, I began to see how deeply
              this creative process could support others too.
            </p>
            <p
              ref={text2Ref}
              className={`about-pc-des-text-p1 scroll-animate ${!isExpanded ? "mobile-hidden" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              My journey began in psychology, however along the way, I felt
              drawn to approaches that were more personal and client-centered.
              An approach that honoured creative expression, connection,
              authenticity, which led me to Art Psychotherapy.
            </p>
            <p
              ref={readMoreRef}
              className={`about-pc-des-text-readmore scroll-animate ${isExpanded ? "mobile-hidden" : ""}`}
              style={{ animationDelay: "0.3s" }}
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </p>
          </div>
          <div
            ref={decorRef}
            className="about-pc-des-decor scroll-animate"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="about-pc-des-decor-img-container">
              <img
                src="/decor.png"
                alt="decor"
                className="about-pc-des-decor-img"
                onError={(e) => {
                  e.currentTarget.src = "./decor.png";
                }}
              />
            </div>
            <div className="about-pc-des-decor-text">
              <h2 className="about-pc-des-decor-text-h2">About Us</h2>
              <p className="about-pc-des-decor-text-p">
                Inheal is a gentle space shaped around the belief that
                creativity can restore the mind, soften emotion, and bring
                people back to themselves. Our approach to art therapy is slow,
                mindful, and deeply human.
              </p>
            </div>
          </div>
          <div
            ref={lineRef}
            className="about-pc-des-decor-line scroll-animate"
            style={{ animationDelay: "0.5s" }}
          >
            <img
              src="/line.png"
              alt="line"
              className="about-pc-des-decor-line-img"
              onError={(e) => {
                e.currentTarget.src = "./line.png";
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Version */}
    </>
  );
};

export default About;
