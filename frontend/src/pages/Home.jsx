import HealthTips from "../Tips/tips";
import CalculatorsCard from "../banners/calculator-banner";
import BloodReportCard from "../banners/ReportAnalyzer-banner";
import FAQSection from "../components/FAQ/FAQ";
import OurVision from "../banners/our-vision";
import Banner from "../banners/Banner";
import About from "./About";

// Home Component
const Home = () => {
  return (
    <div>
      <Banner />
      <hr className="border-3 border-[#023781] my-5 w-3/4 mx-auto" />
      <HealthTips />
      <hr className="border-3 border-[#023781] my-5 w-3/4 mx-auto" />
      <BloodReportCard />
      <hr className="border-3 border-[#023781] my-5 w-3/4 mx-auto" />
      <CalculatorsCard />
      <hr className="border-3 border-[#023781] my-5 w-3/4 mx-auto" />
      <OurVision />
      <hr className="border-3 border-[#023781] my-5 w-3/4 mx-auto" />
      <FAQSection />
      <hr className="border-3 border-[#023781] my-5 w-3/4 mx-auto" />
      <About />
    </div>
  );
};

export default Home;