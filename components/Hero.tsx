import "../styles/hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <video className="hero-main" autoPlay loop muted playsInline>
        <source src="vid-mob.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img src="hero-text.png" alt="hero" className="hero-overlay" />
    </div>
  );
};

export default Hero;
