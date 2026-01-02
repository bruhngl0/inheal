import "../styles/about.scss";

const About = () => {
  return (
    <>
      {/* Hidden SVG for clip-path */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="blob-shape" clipPathUnits="objectBoundingBox">
            <path d="M 0.114,0.336 C 0.269,0.096 0.501,-0.097 0.749,0.053 C 0.997,0.202 1.073,0.518 0.918,0.758 C 0.764,0.998 0.437,1.071 0.189,0.921 C -0.059,0.771 -0.041,0.576 0.114,0.336 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="about-pc">
        <div className="about-pc-img">
          <img src="about-pari.png" alt="about" className="about-pc-img-img" />
        </div>
        <div className="about-pc-des">
          <div className="about-pc-des-head">
            <h1>Hello, I am Parita. </h1>
          </div>
          <div className="about-pc-des-text">
            <p className="about-pc-des-text-p1">
              Art has always been my way of making sense of the world, a
              language of colours, symbols, and metaphor that helped me express
              what words alone could not. Over time, I began to see how deeply
              this creative process could support others too.
            </p>
            <p className="about-pc-des-text-p2">
              My journey began in psychology, however along the way, I felt
              drawn to approaches that were more personal and client-centered.
              An approach that honoured creative expression, connection,
              authenticity, which led me to Art Psychotherapy.
            </p>

            <p className="about-pc-des-text-readmore">Read more</p>

          </div>
          <div className="about-pc-des-decor">
             <div className="about-pc-des-decor-img-container">
              <img src="decor.png" alt="decor" className="about-pc-des-decor-img" />
             </div>
             <div className="about-pc-des-decor-text">
              <h2 className="about-pc-des-decor-text-h2">About Us</h2>
              <p className="about-pc-des-decor-text-p"> Inheal is a gentle space shaped around the belief that creativity can restore the mind, soften emotion, and bring people back to themselves. Our approach to art therapy is slow, mindful, and deeply human.</p>
             </div>
          </div>
          <div className="about-pc-des-decor-line">
            <img src="line.png" alt="line" className="about-pc-des-decor-line-img" />
          </div>
        </div>
      </div>
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
              themselves. Our approach to art therapy is slow, mindful, and
              deeply human.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
