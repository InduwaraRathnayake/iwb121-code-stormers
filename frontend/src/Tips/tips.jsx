import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./tips.css"; 

// Import images
import stayhydrated from "../assets/stayhydrated.jpg";
import balancedDiet from "../assets/balanced-diet.jpg";
import exercise from "../assets/exercise.jpg";
import sleep from "../assets/sleep.jpg";
import stressManagement from "../assets/stress-management.jpg";
import weightMonitoring from "../assets/weight-monitoring.jpg";
import quitSmoking from "../assets/no-smoking.jpg";
import screenBreak from "../assets/screen-break.jpg";

const healthTips = [
    {
        title: "Stay Hydrated",
        description: "Drink at least 8 glasses of water per day to maintain proper hydration and support overall body function.",
        image: stayhydrated,
    },
    {
        title: "Eat a Balanced Diet",
        description: "Incorporate more fruits, vegetables, whole grains, and lean proteins into your meals. Limit processed foods and added sugars.",
        image: balancedDiet,
    },
    {
        title: "Get Regular Exercise",
        description: "Aim for at least 30 minutes of moderate exercise most days of the week to improve cardiovascular health.",
        image: exercise,
    },
    {
        title: "Maintain a Healthy Sleep Routine",
        description: "Get 7–9 hours of sleep per night to support mental and physical health. Prioritize good sleep hygiene.",
        image: sleep,
    },
    {
        title: "Practice Stress Management",
        description: "Use techniques like deep breathing, meditation, or spending time on hobbies to reduce stress levels.",
        image: stressManagement,
    },
    {
        title: "Monitor Your Weight",
        description: "Keep an eye on your Body Mass Index (BMI) and Waist-to-Hip Ratio (WHR) to assess your weight and body fat distribution.",
        image: weightMonitoring,
    },
    {
        title: "Quit Smoking and Limit Alcohol",
        description: "If you smoke, consider quitting. Limit alcohol intake to moderate levels to reduce long-term health risks.",
        image: quitSmoking,
    },
    {
        title: "Take Breaks from Screen Time",
        description: "Reduce eye strain by taking regular breaks from screens and practicing the 20-20-20 rule.",
        image: screenBreak,
    }
];

export default function HealthTips() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 3,
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontSize: "3rem",
                    color: "#034c81", 
                    fontWeight: "bold",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                }}
            >
                General Health Tips
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', // Four columns
                    gap: 2, // Space between cards
                    width: '100%', // Full width
                    maxWidth: '1200px', // Optional max width for layout control
                }}
            >
                {healthTips.map((tip, index) => (
                    <Card
                        key={index}
                        sx={{
                            marginBottom: 2,
                            cursor: "pointer",
                            borderRadius: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white for card backgrounds
                            boxShadow:
                                'rgba(133, 189, 215, 0.878) 0px 20px 20px -15px',
                            transition:
                                'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform:
                                    'scale(1.05)',
                                boxShadow:
                                    'rgba(133, 189, 215, 0.878) 0px 30px 30px -20px',
                            },
                        }}
                    >
                        <CardMedia 
                            component="img" 
                            height="140" 
                            image={tip.image} 
                            alt={tip.title} 
                            sx={{ 
                                objectFit: 'cover', // Ensures the image covers the area without distortion
                                width: '100%', // Ensures full width of card
                                height: '140px', // Fixed height for uniformity
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ color:'#1089D3', fontWeight:'bold' }}>
                                {tip.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {tip.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}