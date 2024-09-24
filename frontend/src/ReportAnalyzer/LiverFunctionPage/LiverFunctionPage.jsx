import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImg from '../../assets/background.jpg'; // Add your background image path

const BackgroundBox = styled(Box)(() => ({
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff', // Change text color for better visibility
}));

const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '20px',
  textAlign: 'center',
}));

const TitleBox = styled(Box)(() => ({
  marginBottom: '30px',
}));

const FormContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  width: '100%',
  maxWidth: '600px',
  border: '2px solid #1089D3', // Add border for definition
  backdropFilter: 'blur(10px)', // Blur effect for a stylish look
}));

const LiverFunctionTestsPage = () => {
  const [formData, setFormData] = useState({
    alt: '',
    ast: '',
    alp: '',
    bilirubin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission
  };

  return (
    <BackgroundBox>
      <ContentContainer>
        <TitleBox>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 900, fontSize: '50px', color: '#034c81' }}>
            Liver Function Tests Analyzer
          </Typography>
        </TitleBox>

        <FormContainer>
          <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="alt"
              label="ALT"
              value={formData.alt}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }} // Add spacing between fields
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="ast"
              label="AST"
              value={formData.ast}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="alp"
              label="ALP"
              value={formData.alp}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="bilirubin"
              label="Bilirubin"
              value={formData.bilirubin}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #1089D3 0%, #12B1D1 100%)',
                color: 'white',
                padding: '15px',
                marginTop: '20px',
                borderRadius: '20px',
                boxShadow: 'rgba(133, 189, 215, 0.878) 0px 20px 10px -15px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 'rgba(133, 189, 215, 0.878) 0px 23px 10px -20px',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                  boxShadow: 'rgba(133, 189, 215, 0.878) 0px 15px 10px -10px',
                },
              }}
            >
              Analyze
            </Button>
          </form>
        </FormContainer>
      </ContentContainer>
    </BackgroundBox>
  );
};

export default LiverFunctionTestsPage;
