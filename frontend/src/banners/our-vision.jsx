import React from 'react';
import { Container, Box, Typography, CardContent } from '@mui/material';

const OurVision = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginBottom: 4,
        padding: '40px',
        borderRadius: '20px',
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CardContent
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: 0, 
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 1000,
              fontSize: '60px',
              color: '#034c81',
              textAlign: 'center',
              marginBottom: '20px',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), 4px 4px 10px rgba(0, 0, 0, 0.2), 6px 6px 15px rgba(0, 0, 0, 0.1)', // Enhanced 3D effect
            }}
          >
            Our Vision
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: '#034c81',
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '35px',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), 4px 4px 10px rgba(0, 0, 0, 0.2), 6px 6px 15px rgba(0, 0, 0, 0.1)', // Enhanced 3D effect
            }}
          >
            Empowering Health Through Knowledge
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#333',
              lineHeight: 1.5,
              textAlign: 'center',
              padding: '0 16px',
              marginBottom: '20px',
              fontWeight: 700,
              fontSize: '20px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', 
            }}
          >
            Our vision is to empower individuals to take charge of their health through accessible, reliable, and user-friendly tools and resources. We strive to create a community where knowledge, support, and motivation are shared, fostering a holistic approach to wellness and well-being for everyone.
          </Typography>
        </CardContent>
      </Box>
    </Container>
  );
};

export default OurVision;
