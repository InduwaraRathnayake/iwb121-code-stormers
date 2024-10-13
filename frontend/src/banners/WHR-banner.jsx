import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CardButton } from '../components/Card';
import waistToHipBanner from '../assets/whr-banner.jpg'; 

const WHRCard = () => {
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 500,
            height: 600,
            boxShadow: 5,
            borderRadius: '20px',
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2, 
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
                  marginBottom: '15px',
                }}
              >
                Discover Your Waist to Hip Ratio!
              </Typography>
              <Typography
                sx={{
                  mb: 2, 
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '16px', 
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
                  src={waistToHipBanner} 
                  alt="Waist to Hip Ratio Banner"
                  sx={{
                    width: '80%',
                    height: 'auto',
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
                  to="/whr-calculator" 
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
