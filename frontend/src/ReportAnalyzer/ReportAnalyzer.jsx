import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './ReportAnalyzer.css';

const tests = [
    {
        title: 'Full Blood Count (FBC)',
        description: 'A complete blood count is a test that evaluates overall health and detects a variety of disorders.',
        image: 'https://www.shutterstock.com/image-photo/doctor-holding-test-blood-sample-260nw-2465466121.jpg',
        path: '/fbc', // Add path for navigation
    },
    {
        title: 'Lipid Panel',
        description: 'A lipid panel is a blood test that measures cholesterol and triglyceride levels.',
        image: 'https://www.shutterstock.com/image-photo/doctor-holding-test-blood-sample-260nw-2391820185.jpg',
        path: '/lipid-panel',
    },
    {
        title: 'Liver Function Tests',
        description: 'These tests measure various enzymes, proteins, and substances produced by the liver.',
        image: 'https://www.shutterstock.com/image-photo/blood-sample-liver-function-test-260nw-1082759915.jpg',
        path: '/liver-function',
    },
    {
        title: 'Blood Glucose Test',
        description: 'A blood glucose test measures the amount of glucose in your blood.',
        image: 'https://www.shutterstock.com/image-photo/blood-sample-requisition-form-fasting-260nw-728417929.jpg',
        path: '/blood-glucose',
    },
    {
        title: 'Thyroid Function Tests',
        description: 'These tests measure how well your thyroid is working and how much thyroid hormone is in your blood.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPHV9BQSdWNrMBsaM3_9bjXvJM7V27iWfc0w&s',
        path: '/thyroid-function',
    },
];

export default function ReportAnalyzer() {
    const navigate = useNavigate(); // Initialize navigate

    const handleCardClick = (path) => {
        navigate(path); // Navigate to the selected path
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                backgroundColor: '#e3f2fd',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Select the blood report you would like to analyze
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {tests.map((test, index) => (
                    <Card
                        key={index}
                        sx={{
                            maxWidth: 345,
                            margin: 1,
                            cursor: 'pointer', // Change cursor to pointer
                        }}
                        onClick={() => handleCardClick(test.path)} // Handle card click
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={test.image}
                            alt={test.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {test.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {test.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
