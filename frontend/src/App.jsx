import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ReportAnalyzer from "./ReportAnalyzer/ReportAnalyzer"; // Importing ReportAnalyzer
import FBCPage from "./ReportAnalyzer/FBCPage/FBCPage"; // Importing specific test pages
import LipidPanel from "./ReportAnalyzer/LipidPanelPage/LipidPanelPage";
import LiverFunctionTests from "./ReportAnalyzer/LiverFunctionPage/LiverFunctionPage";
import BloodGlucoseTest from "./ReportAnalyzer/BloodGlucosePage/BloodGlucosePage";
import ThyroidFunctionTests from "./ReportAnalyzer/ThyroidFunctionPage/ThyroidFunctionPage";
import CRPTestPage from "./ReportAnalyzer/CRPPage/CRPPage";
import BMICalculator from "./Calculators/BMI Calculator/BmiCalculator";
import WHRCalculator from "./Calculators/WHR Calculator/WhrCalculator";
import UserProfile from "./pages/UserProfile";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Calculator from "./Calculators/Calculator";

// Hide the Navbar and Footer on certain routes
const Layout = () => {
  const location = useLocation();
  const shouldHideNavbarFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
    <div style={layoutStyle}>
      {!shouldHideNavbarFooter && <Navbar />}
      <div style={contentStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reports" element={<ReportAnalyzer />} />
          <Route path="/fbc" element={<FBCPage />} />
          <Route path="/lipid-panel" element={<LipidPanel />} />
          <Route path="/liver-function-tests" element={<LiverFunctionTests />} />
          <Route path="/blood-glucose-test" element={<BloodGlucoseTest />} />
          <Route path="/thyroid-function-tests" element={<ThyroidFunctionTests />} />
          <Route path="/c-reactive-protein-test" element={<CRPTestPage />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/whr-calculator" element={<WHRCalculator />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/calculators" element={<Calculator />} />
        </Routes>
      </div>
      {!shouldHideNavbarFooter && <Footer />}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // Ensures the layout takes up the full height of the viewport
};

const contentStyle = {
  flex: "1", // Takes up the remaining space between navbar and footer
};
