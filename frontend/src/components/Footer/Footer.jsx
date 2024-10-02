import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          <h2 style={logoStyle}>WELLNESS 360</h2>
          <p>
            Get instant clarity on your blood test results. Expert analysis,
            easy tracking, all in one app. Start now!
          </p>
          <div style={socialIconsStyle}>
              <Link to="#" style={iconStyle}>
                <img src="/fb.png" alt="Facebook" style={iconImageStyle} />
              </Link>
              <Link to="#" style={iconStyle}>
                <img src="/in.png" alt="Instagram" style={iconImageStyle} />
              </Link>
            </div>
        </div>
        <div style={centerSectionStyle}>
          <h3 style={logoStyle1}>WELLNESS 360</h3>
          <ul style={listStyle}>
            <li>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" style={linkStyle}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact-us" style={linkStyle}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" style={linkStyle}>
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div style={rightSectionStyle}>
          <h3 style={logoStyle1}>YOU ARE ALWAYS OUR PRIORITY</h3>
          <p>University of Moratuwa</p>
          <p>+94 123456789</p>
          <p>
            <a href="mailto:Abcd@gmail.com" style={linkStyle}>
              wellness360@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div style={bottomSectionStyle}>
        <p>2024 © WELLNESS 360.lk - All rights reserved.</p>
      </div>
    </footer>
  );
};

// Styles

const logoStyle1 = {
  color: "#1E90FF", // Light blue color
};
const footerStyle = {
  backgroundColor: "#125488",
  color: "#fff",
  padding: "20px 0",
  position: "relative",
  width: "100%",
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
};

const sectionStyle = {
  textAlign: "center",
  padding: "0 20px", // Add padding to create space between sections
};

const logoStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1E90FF", // Light blue color
};

const socialIconsStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const iconStyle = {
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconImageStyle = {
  width: "40px",
  height: "40px",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
  margin: 0,
};

const linkStyle = {
  color: "#fff", // Keep link color white
  textDecoration: "none",
};

const bottomSectionStyle = {
  textAlign: "center",
  marginTop: "20px",
  borderTop: "1px solid #fff",
  paddingTop: "10px",
};

const leftSectionStyle = {
  flex: "1",
  textAlign: "left",
};

const centerSectionStyle = {
  flex: "1",
  textAlign: "center",
};

const rightSectionStyle = {
  flex: "1",
  textAlign: "right",
};

export default Footer;
