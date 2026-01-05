import Link from "next/link";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-logo">
        <img src="logo-footer.png" alt="footer" />
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
          <img src="whatsapp.svg" alt="wa" />
        </div>

        <div className="icons">
          <img src="insta.svg" alt="in" />
        </div>

        <div className="icons">
          <img src="ln.png" alt="ic" />
        </div>
      </div>

      <div className="copyright">2025, Inheal, All rights reserved.</div>
    </div>
  );
};

export default Footer;
