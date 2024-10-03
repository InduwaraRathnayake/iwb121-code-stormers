import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import bannerImage from '../assets/banner-image.jpg'; // Replace with your banner image
import logo from '../assets/logo.png'; // Replace with your logo image

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.2)', // Darker overlay for better text visibility
          zIndex: 1,
        },
        overflow: 'hidden', // Prevents any overflow issues with animations
      }}
    >
      {/* Logo with transparency, adjusted position */}
      <Box 
        component="img" 
        src={logo} 
        alt="Logo" 
        sx={{
          width: '330px',
          mb: 16, // Reduced margin below the logo to lift it higher
          zIndex: 2,
          opacity: 0.8, // Adjust the opacity for transparency
          transition: 'transform 0.3s ease, opacity 0.3s ease', // Smooth hover effect
          '&:hover': {
            transform: 'scale(1.05)', // Slightly scale up on hover
            opacity: 1, // Fully visible on hover
          },
        }} 
      />
      {/* Animated Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
          mb: 5,
          zIndex: 2,
          animation: 'fadeIn 1s ease-in-out', // Fade-in animation
        }}
      >
        Welcome to Wellness 360
      </Typography>
      {/* Animated Subtitle */}
      <Typography
        variant="h6"
        sx={{
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
          mb: 12,
          zIndex: 2,
          animation: 'fadeIn 1.5s ease-in-out', // Fade-in animation
        }}
      >
        Your journey to a healthier life starts here.
      </Typography>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default Banner;
