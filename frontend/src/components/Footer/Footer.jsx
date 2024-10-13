import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#125488] text-white py-5 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start max-w-screen-xl mx-auto px-5">
        {/* Left Section */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-lg font-bold text-[#1E90FF]">WELLNESS 360</h2>
          <p className="mt-4">
            Get instant clarity on your blood test results. Expert analysis,
            easy tracking, all in one app. Start now!
          </p>
          <div className="flex gap-4 mt-4">
          <Link to="#">
              <img src="/yt.png" alt="Youtube" className="w-12 h-12" />
            </Link>
            <Link to="#">
              <img src="/fb.png" alt="Facebook" className="w-10 h-10" />
            </Link>    
          </div>
        </div>

        {/* Center Section */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-bold text-[#1E90FF]">WELLNESS 360</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" className="text-white no-underline hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white no-underline hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="text-white no-underline hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="text-white no-underline hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-bold text-[#1E90FF]">
            YOU ARE ALWAYS OUR PRIORITY
          </h3>
          <p className="mt-4">University of Moratuwa</p>
          <p className="mt-2">+94 123456789</p>
          <p className="mt-2">
            <a href="mailto:wellness360@gmail.com" className="text-white hover:underline">
              wellness360@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="text-center mt-5 border-t border-white pt-4">
        <p>2024 © WELLNESS 360.lk - All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
