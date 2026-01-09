"use client";
import { useState, useEffect } from "react";
import "../styles/hero.scss";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sources, setSources] = useState({ video: "", poster: "" });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) {
        setSources({
          video: "/mobnewvid.mp4",
          poster: "/fallbackmobile.webp",
        });
      } else {
        setSources({
          video: "/pcnewvid.mp4",
          poster: "/fallbackpc.webp",
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  // Only render once sources are determined
  if (!sources.video || !sources.poster) {
    return <div className="hero" style={{ backgroundColor: "#FFF5CA" }} />;
  }

  return (
    <div className={`hero ${isLoaded ? "video-ready" : "video-loading"}`}>
      {/* Fallback Placeholder - Now safely checks for poster string */}
      {!isLoaded && (
        <div className="hero-placeholder">
          <img
            src={sources.poster}
            alt="Loading..."
            className="placeholder-img"
          />
          <div className="loader-dot">
            <img src="logo.png" />
          </div>
        </div>
      )}

      {/* Video Tag */}
      <video
        key={sources.video}
        className="hero-main"
        autoPlay
        loop
        muted
        playsInline
        poster={sources.poster}
        onLoadedData={handleVideoLoad}
        onCanPlayThrough={handleVideoLoad}
      >
        <source src={sources.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Hero;
