import HealthTips from "../Tips/tips";
import CalculatorsCard from "../banners/calculator-banner";
import BloodReportCard from "../banners/ReportAnalyzer-banner";
import { Link } from "react-router-dom";
import FAQSection from "../components/FAQ/FAQ";
import OurVision from "../banners/our-vision";
import bannerImage from "../assets/banner1.png";

// Home Component
const Home = () => {
  return (
    <div>
      <img src={bannerImage} width="100%" height="auto"></img>
      <HealthTips />
      <BloodReportCard />
      <CalculatorsCard />
      <OurVision />
      <FAQSection />
    </div>
  );
};

export default Home;
