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
import BmiCalculator from './BMI Claculator/BmiCalculator';

function App() {
    return (
        <div className="App">
            <BmiCalculator />
        </div>
    );
}

export default App;

//hii