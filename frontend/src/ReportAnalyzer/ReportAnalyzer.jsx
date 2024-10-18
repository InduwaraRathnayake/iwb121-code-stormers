import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import fbcImage from '../assets/fbc.jpg';
import liverFunctionTestsImage from '../assets/liver-function-test.jpg';
import lipidPanelImage from '../assets/lipid-test.jpg';
import bloodGlucoseTestImage from '../assets/blood-glucose.jpg';
import thyroidFunctionTestsImage from '../assets/thyroid-test.jpg';
import crpTestImage from '../assets/crp.jpg';

const tests = [
  {
    title: "Full Blood Count (FBC)",
    description:
      "A complete blood count is a test that evaluates overall health and detects a variety of disorders.",
    image: fbcImage,
    path: "/fbc",
  },
  {
    title: "Thyroid Function Tests",
    description:
      "These tests measure how well your thyroid is working and how much thyroid hormone is in your blood.",
    image: thyroidFunctionTestsImage,
    path: "/thyroid-function-tests",
  },
  
  {
    title: "C-Reactive Protein Test",
    description:
      "The C-Reactive Protein test measures the level of CRP in the blood, which increases in response to inflammation. ",
    image: crpTestImage,
    path: "/c-reactive-protein-test",
},
{
    title: "Lipid Panel",
    description:
      "A lipid panel is a blood test that measures cholesterol and triglyceride levels.",
    image: lipidPanelImage,
    path: "/lipid-panel",
  },
  {
    title: "Blood Glucose Test",
    description:
      "A blood glucose test measures the amount of glucose in your blood.",
    image: bloodGlucoseTestImage,
    path: "/blood-glucose-test",
  },
 
 
{
    title: "Liver Function Tests",
    description:
      "These tests measure various enzymes, proteins, and substances produced by the liver.",
    image: liverFunctionTestsImage,
    path: "/liver-function-tests",
  },

];

export default function ReportAnalyzer() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

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
        Unlock Your Health Insights
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {tests.map((test, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 320, 
              margin: 4,
              cursor: "pointer",
              borderRadius: '20px',
              boxShadow: 'rgba(133, 189, 215, 0.878) 0px 20px 20px -15px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 'rgba(133, 189, 215, 0.878) 0px 30px 30px -20px',
              },
            }}
            onClick={() => handleCardClick(test.path)}
          >
            <CardMedia
              component="img"
              height="140"
              image={test.image}
              alt={test.title}
              sx={{ 
                objectFit: 'cover', 
                width: '100%', 
                height: '230px', 
            }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: '#1089D3', fontWeight: 'bold' }}>
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
