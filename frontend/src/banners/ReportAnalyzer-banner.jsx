import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CardButton } from '../components/Card';
import bloodReportBanner from '../assets/blood-report-banner.jpg'; // Update with the actual image path

const BloodReportCard = () => {
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card
          sx={{
            maxWidth: { xs: '90%', md: 1100 }, // Full width on small screens, max width on medium and up
            height: 'auto', // Set height to auto for responsive behavior
            minHeight: '500px', // Set a minimum height for the card
            boxShadow: 5,
            borderRadius: '20px',
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            overflow: 'hidden',
            display: { xs: 'block', md: 'flex' }, // Block on small screens, flex on medium and up
          }}
        >
          {/* Content Box */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: '24px',
                  color: '#034c81',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                Analyze Your Blood Report!
              </Typography>
              <Typography
                sx={{
                  mb: 2,
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '16px',
                }}
              >
                Understanding your blood report is crucial for monitoring your health. 
                This analysis can help identify any potential health issues and guide you 
                in making informed decisions about your lifestyle. Whether you're checking 
                for cholesterol levels, blood sugar, or other critical metrics, we're here 
                to assist you on your journey to better health.
              </Typography>
              
              {/* Button Box */}
              <Box display="flex" justifyContent="center">
                <CardButton
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/reports" // Update with the actual route
                >
                  Start Analyzing Your Report Now
                </CardButton>
              </Box>
            </CardContent>
          </Box>

          {/* Image Box */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Box
              component="img"
              src={bloodReportBanner} // Update with the actual image path
              alt="Blood Report Analyzer Banner"
              sx={{
                width: '90%', // Increased width for the image
                height: 'auto', // Adjusted height to auto for proper aspect ratio
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default BloodReportCard;
