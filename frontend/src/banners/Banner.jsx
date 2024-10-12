import { Box, Typography } from '@mui/material';
import bannerImage from '../assets/banner-image.jpg'; 
import logo from '../assets/logo.png'; 

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh', // Full viewport height
        width: '100%', // Full viewport width
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
          background: 'rgba(0, 0, 0, 0.2)', 
          zIndex: 1,
        },
        overflow: 'hidden', 
      }}
    >
      {/* Logo with transparency, adjusted position */}
      <Box 
        component="img" 
        src={logo} 
        alt="Logo" 
        sx={{
          width: { xs: '200px', sm: '250px', md: '350px' },
          mt: { xs: 10, sm: 15, md: 26 }, 
          zIndex: 2,
          opacity: 0.8, 
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)', 
            opacity: 1, 
          },
        }} 
      />
      {/* Animated Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif',
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
          mt: { xs: 5, sm: 8, md: 10 }, 
          zIndex: 2,
          animation: 'fadeIn 1s ease-in-out',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, 
        }}
      >
        Welcome to Wellness 360
      </Typography>
      {/* Animated Subtitle */}
      <Typography
        variant="h6"
        sx={{
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
          mb: { xs: 5, sm: 8, md: 15 }, 
          zIndex: 2,
          animation: 'fadeIn 2s ease-in-out', 
          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }, 
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