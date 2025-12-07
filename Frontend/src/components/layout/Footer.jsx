import "./Footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const linkedInUrl = "https://www.linkedin.com/in/tejastupe/";

  return (
    <footer className="app-footer-simple">
      <div className="container footer-attribution-inner">
        <p className="footer-copyright-simple">
          &copy; {currentYear} Vyaparsathi. All rights reserved.
        </p>

        <p className="footer-developed-by">
          Designed, developed, deployed and maintained by&nbsp;
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="developer-link"
          >
            Tejas Tupe
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
