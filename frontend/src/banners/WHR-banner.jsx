import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CardButton } from '../components/Card';
import waistToHipBanner from '../assets/whr-banner.jpg'; // Update with the actual image path

const WHRCard = () => {
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column', // Stack elements vertically
            maxWidth: 500, // Maximum width
            height: 600, // Adjusted height for better aspect ratio
            boxShadow: 5,
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2, // Adjusted padding
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: '24px', // Font size
                  color: '#034c81',
                  textAlign: 'center',
                  marginBottom: '15px',
                }}
              >
                Discover Your Waist to Hip Ratio!
              </Typography>
              <Typography
                sx={{
                  mb: 2, // Margin bottom
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '16px', // Font size for readability
                }}
              >
                Want to know if your waist to hip ratio is in a healthy range? Click the button below to find out!
              </Typography>
              
              {/* Moved the image Box before the button */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={waistToHipBanner} // Update with the actual image path
                  alt="Waist to Hip Ratio Banner"
                  sx={{
                    width: '80%',
                    height: 'auto', // Adjusted height to auto for proper aspect ratio
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>

              {/* Button Box */}
              <Box display="flex" justifyContent="center">
                <CardButton
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/whr-calculator" // Update with the actual route
                >
                  Calculate Your Ratio Now
                </CardButton>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default WHRCard;