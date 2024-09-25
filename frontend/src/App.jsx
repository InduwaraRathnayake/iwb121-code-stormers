// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/greeting');
//         setMessage(response.data.message); // Assuming the JSON has a 'message' field
//       } catch (error) {
//         console.error('Error fetching the data', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>{message}</h1>
//     </div>
//   );
// }


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportAnalyzer from './ReportAnalyzer/ReportAnalyzer';
import FBCPage from './ReportAnalyzer/FBCPage/FBCPage';
import LipidPanel from './ReportAnalyzer/LipidPanelPage/LipidPanelPage';
import LiverFunctionTests from './ReportAnalyzer/LiverFunctionPage/LiverFunctionPage';
import BloodGlucoseTest from './ReportAnalyzer/BloodGlucosePage/BloodGlucosePage';
import ThyroidFunctionTests from './ReportAnalyzer/ThyroidFunctionPage/ThyroidFunctionPage';
import CRPTestPage from './ReportAnalyzer/CRPPage/CRPPage';
import BMICalculator from './BMI Calculator/BmiCalculator';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ReportAnalyzer />} />
                <Route path="/fbc" element={<FBCPage />} />
                <Route path="/lipid-panel" element={<LipidPanel />} />
                <Route path="/liver-function-tests" element={<LiverFunctionTests />} />
                <Route path="/blood-glucose-test" element={<BloodGlucoseTest />} />
                <Route path="/thyroid-function-tests" element={<ThyroidFunctionTests />} />
                <Route path="/c-reactive-protein-test" element={<CRPTestPage />} />
            </Routes>
        </Router>
        // <BMICalculator />

    );
}

export default App;





