import './Footer.scss';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="narrow-container">
        <div className="footer-card-container">
          <div className="footer-card-item">
            <a
              href="https://github.com/tlkv/project-management-app"
              target="_blank"
              rel="noreferrer"
              className="footer-card-link"
            >
              <i className="fa-brands fa-github git-big" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
