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
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import ContactUs from './pages/ContactUs';


function App() {
    return (
        <Router>
            <div>
                {/* Navigation Bar */}
                <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>
                </nav>

                {/* Main Content Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
            </div>
        </Router>
    );
}



export default App;