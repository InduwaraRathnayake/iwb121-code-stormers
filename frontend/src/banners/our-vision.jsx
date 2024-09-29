import React from 'react';
import { Container, Box, Typography, CardContent } from '@mui/material';

const OurVision = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: 4 }}> {/* Set maxWidth to 'lg' for a wider layout */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" >
          <CardContent sx={{ position: 'relative', zIndex: 1 }}> 
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 1000,
                fontSize: '55px',
                color: '#034c81',
                textAlign: 'center',
                marginBottom: '20px',
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
