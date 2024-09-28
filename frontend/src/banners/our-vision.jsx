import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import visionImage from '../assets/vision-image.jpg'; // Add a relevant image

const OurVision = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: 4 }}> {/* Set maxWidth to 'lg' for a wider layout */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Card
          sx={{
            maxWidth: '100%', // Full width
            boxShadow: 10,
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly more opaque background
            position: 'relative',
            padding: '50px',
          }}
        >
          {/* Background Image */}
          <img src={visionImage} alt="Vision Background" style={{ width: '100%', height: 'auto', position: 'absolute', top: 0, left: 0, opacity: 0.2 }} />
          
          <CardContent sx={{ position: 'relative', zIndex: 1 }}> {/* Ensure content is above the image */}
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 900,
                fontSize: '36px',
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
                marginBottom: '10px',
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
              }}
            >
              Our vision is to empower individuals to take charge of their health through accessible, reliable, and user-friendly tools and resources. We strive to create a community where knowledge, support, and motivation are shared, fostering a holistic approach to wellness and well-being for everyone.
            </Typography>
            
            {/* Additional Details */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#034c81',
                marginBottom: '10px',
              }}
            >
              Key Principles:
            </Typography>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#333' ,fontWeight: 700}}>
              <li>Accessibility: Making health resources available to everyone.</li>
              <li>Education: Providing clear and concise information to promote understanding.</li>
              <li>Community: Building a supportive network for sharing experiences and encouragement.</li>
              <li>Holistic Approach: Emphasizing overall wellness, not just physical health.</li>
            </ul>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default OurVision;
