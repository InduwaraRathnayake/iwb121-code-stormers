import React, { useState } from 'react';
import Speedometer from 'react-d3-speedometer';
import './BmiCalculator.css'; // Optional for additional custom styles

function BmiCalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');

    const calculateBMI = () => {
        if (!weight || !height || !age) {
            alert('Please enter weight, height, and age!');
            return;
        }

        const heightInMeters = parseFloat(height) / 100;
        const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(bmiValue);
        
        let bmiStatus = '';
        if (bmiValue < 18.5) {
            bmiStatus = 'Underweight';
        } else if (bmiValue < 24.9) {
            bmiStatus = 'Normal weight';
        } else if (bmiValue < 29.9) {
            bmiStatus = 'Overweight';
        } else {
            bmiStatus = 'Obesity';
        }

        if (age < 18) {
            bmiStatus += ' (Consider consulting a healthcare provider)';
        } else if (age >= 65) {
            bmiStatus += ' (Older adults may have different health considerations)';
        }

        setStatus(bmiStatus);
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96'>
                <h1 className='text-2xl font-bold mb-4'>BMI Calculator</h1>
                <div className='mb-4'>
                    <label className='block mb-1'>Weight (kg):</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='Enter your weight' />
                </div>
                <div className='mb-4'>
                    <label className='block mb-1'>Height (cm):</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='Enter your height' />
                </div>
                <div className='mb-4'>
                    <label className='block mb-1'>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='Enter your age' />
                </div>
                <div className='mb-4'>
                    <label className='block mb-1'>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className='w-full p-2 rounded bg-gray-700 text-white'>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button onClick={calculateBMI} className='w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded'>Calculate</button>
                {bmi && (
                    <div className='mt-6 text-center'>
                        <h3>Your BMI: {bmi}</h3>
                        <h3>Status: {status}</h3>
                        <Speedometer 
                            value={bmi}
                            minValue={10}
                            maxValue={50}
                            needleColor="#fff"
                            startColor="#FF0000"
                            segments={5}
                            endColor="#00FF00"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default BmiCalculator;