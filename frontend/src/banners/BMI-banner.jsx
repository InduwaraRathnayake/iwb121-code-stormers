import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CardButton } from '../components/Card';
import bmiBanner from '../assets/bmi-banner.jpg';

const BmiBannerCard = () => {
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
            backgroundColor: "rgba(255, 255, 255, 0.5)",
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
                  marginBottom: '30px',
                }}
              >
                Discover Your Ideal Self!
              </Typography>
              <Typography
                sx={{
                  mb: 2,
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '16px',
                  marginBottom: '30px',
                }}
              >
                Ever wondered what your perfect BMI is? Click the button below and start your journey towards a healthier you!
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
                  src={bmiBanner}
                  alt="BMI Banner"
                  sx={{
                    width: '90%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px',
                  }}
                />
              </Box>
              
              {/* Button Box */}
              <Box display="flex" justifyContent="center">
                <CardButton
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/bmi-calculator"
                >
                  Calculate Your BMI Now
                </CardButton>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default BmiBannerCard;
