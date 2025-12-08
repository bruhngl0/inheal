import "../styles/about.scss";

const About = () => {
  return (
    <div className="about">
      <div className="about-main">
        <img src="about-inheal.png" alt="about" className="about-main-img" />
      </div>
      <div className="about-main-des">
        <div className="about-main-des-head">
          <h1>About us</h1>
        </div>
        <div className="about-main-des-des">
          <p>
            Inheal is a gentle space shaped around the belief that creativity
            can restore the mind, soften emotion, and bring people back to
            themselves. Our approach to art therapy is slow, mindful, and deeply
            human.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
