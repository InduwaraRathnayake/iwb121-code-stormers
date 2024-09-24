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

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportAnalyzer from './ReportAnalyzer/ReportAnalyzer.jsx'; // Create this component
import FBCPage from './FBCPage/FBCPage.jsx'; // Create this component
import LipidPanelPage from './LipidPanelPage/LipidPanelPage.jsx'; // Create this component
import LiverFunctionPage from './LiverFunctionPage/LiverFunctionPage.jsx'; // Create this component
import BloodGlucosePage from './BloodGlucosePage/BloodGlucosePage.jsx'; // Create this component
import ThyroidFunctionPage from './ThyroidFunctionPage/ThyroidFunctionPage.jsx'; // Create this component

function App() {
    return (
        
        <Router>
            <Routes>
                <Route path="/" element={<ReportAnalyzer />} />
                <Route path="/fbc" element={<FBCPage />} />
                <Route path="/lipid-panel" element={<LipidPanelPage />} />
                <Route path="/liver-function" element={<LiverFunctionPage />} />
                <Route path="/blood-glucose" element={<BloodGlucosePage />} />
                <Route path="/thyroid-function" element={<ThyroidFunctionPage />} />
            </Routes>
        </Router>
    );
}

export default App;


// import React from 'react'
// import ReportAnalyzer from './ReportAnalyzer/ReportAnalyzer';

// const App = () => {
//   return (
//     <ReportAnalyzer/>
//   )
// }

// export default App



