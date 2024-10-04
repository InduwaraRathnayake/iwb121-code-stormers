import BMICalculator from '../Calculators/BMI Calculator/BmiCalculator'
import WHRCalculator from '../Calculators/WHR Calculator/WhrCalculator';
import ReportAnalyzer from '../ReportAnalyzer/ReportAnalyzer';

// Services Component
const Services = () => {
    return (
        <div>
            <ReportAnalyzer />
            <BMICalculator />
            <WHRCalculator />
        </div>
    );
};

export default Services;