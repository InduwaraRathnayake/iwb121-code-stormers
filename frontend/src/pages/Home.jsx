import HealthTips from "../Tips/tips";
import CalculatorsCard from "../banners/calculator-banner";
import BloodReportCard from "../banners/ReportAnalyzer-banner";
import { Link } from "react-router-dom";
import FAQSection from "../components/FAQ/FAQ";
import OurVision from "../banners/our-vision";

// Home Component
const Home = () => {
  return (
    <div>
      <HealthTips />
      <BloodReportCard />
      <CalculatorsCard />
      <OurVision />
      <FAQSection />
      {/* Link to navigate */}
      <p>
        Go to <Link to="/services">Services</Link>
      </p>
    </div>
  );
};

export default Home;
