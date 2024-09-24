import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

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
    <Box
      sx={{
        maxWidth: 400,
        backgroundColor: '#e3f2fd',
        borderRadius: '40px',
        padding: '25px 35px',
        border: '5px solid #FFFFFF',
        boxShadow: 'rgba(133, 189, 215, 0.878) 0px 30px 30px -20px',
        margin: '20px auto',
      }}
    >
      <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 900, fontSize: '30px', color: '#1089D3' }}>
        Liver Function Tests Analyzer
      </Typography>
      <form onSubmit={handleSubmit} className="form" style={{ marginTop: '20px' }}>
        <TextField
          required
          fullWidth
          variant="outlined"
          margin="normal"
          name="alt"
          label="ALT"
          value={formData.alt}
          onChange={handleChange}
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
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #1089D3 0%, #12B1D1 100%)',
            color: 'white',
            padding: '15px',
            margin: '20px 0',
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
    </Box>
  );
};

export default LiverFunctionTestsPage;
