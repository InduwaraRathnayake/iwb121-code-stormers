import HealthTips from "../Tips/tips";
import CalculatorsCard from "../banners/calculator-banner";
import BloodReportCard from "../banners/ReportAnalyzer-banner";
import FAQSection from "../components/FAQ/FAQ";
import OurVision from "../banners/our-vision";
import Banner from "../banners/Banner";

// Home Component
const Home = () => {
  return (
    <div>
     <Banner />
      <HealthTips />
      <BloodReportCard />
      <CalculatorsCard />
      <OurVision />
      <FAQSection />
    </div>
  );
};

export default Home;
