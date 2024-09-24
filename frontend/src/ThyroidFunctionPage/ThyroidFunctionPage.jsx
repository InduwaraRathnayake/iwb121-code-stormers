import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ThyroidFunctionTests = () => {
  const [formData, setFormData] = useState({
    tsh: '',
    t3: '',
    t4: ''
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
    // Here you can handle the form submission.
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
        Thyroid Function Tests Analyzer
      </Typography>
      <form onSubmit={handleSubmit} className="form" style={{ marginTop: '20px' }}>
        <TextField
          required
          fullWidth
          variant="outlined"
          margin="normal"
          name="tsh"
          label="TSH"
          value={formData.tsh}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          variant="outlined"
          margin="normal"
          name="t3"
          label="T3"
          value={formData.t3}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          variant="outlined"
          margin="normal"
          name="t4"
          label="T4"
          value={formData.t4}
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

export default ThyroidFunctionTests;
