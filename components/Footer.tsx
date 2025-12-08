import Link from "next/link";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-logo">
        <img src="logo-footer.png" />
      </div>

      <div className="footer-des">
        <p>Cleansing mind through art</p>
      </div>

      <div className="footer-number">
        <p>+91 9191919191</p>
      </div>

      <div>inhealarttherapy@gmail.com</div>

      <div className="footer-icons">
        <div className="icons">
          <img src="whatsapp.svg" />
        </div>

        <div className="icons">
          <img src="insta.svg" />
        </div>

        <div className="icons">
          <img src="linkedin.png" />
        </div>
      </div>

      <div className="copyright">2025, Inheal, All rights reserved.</div>
    </div>
  );
};

export default Footer;
