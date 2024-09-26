import HealthTips from '../Tips/tips';
import CalculatorsCard from '../banners/calculator-banner';
import BloodReportCard from '../banners/ReportAnalyzer-banner';
import { Link } from 'react-router-dom';

// Home Component
const Home = () => {
    return (
        <div>
            <HealthTips />
            <BloodReportCard />
            <CalculatorsCard /> 
            {/* Link to navigate */}
            <p>Go to <Link to="/services">Services</Link></p>
        </div>
    );
};

export default Home;