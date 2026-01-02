import "../styles/hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      {/* Mobile Video */}
      <video className="hero-main hero-mobile" autoPlay loop muted playsInline>
        <source src="/vid-mob.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* PC/Desktop Video */}
      <video className="hero-main hero-desktop" autoPlay loop muted playsInline>
        <source src="/inpc.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
 
    </div>
  );
};

export default Hero;
