import HealthTips from '../Tips/tips';
import { Link } from 'react-router-dom';

// Home Component
const Home = () => {
    return (
        <div>
            <HealthTips />
            {/* Link to navigate */}
            <p>Go to <Link to="/services">Services</Link></p>
        </div>
    );
};

export default Home;