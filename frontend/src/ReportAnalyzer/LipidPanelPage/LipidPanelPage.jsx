import { useState } from 'react';
import {TextField, Typography } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';
import {BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton} from '../../components/Card'


const LipidPanelPage = () => {
  const [formData, setFormData] = useState({
    cholesterol: '',
    triglycerides: '',
    hdl: '',
    ldl: ''
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
    <BackgroundBox backgroundImg={backgroundImg}>
      <ContentContainer>
        <TitleBox>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 900, fontSize: '50px', color: '#034c81' }}>
            Lipid Panel Report Analyzer
          </Typography>
        </TitleBox>

        <FormContainer>
          <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="cholesterol"
              label="Total Cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }} // Add spacing between fields
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="triglycerides"
              label="Triglycerides"
              value={formData.triglycerides}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="hdl"
              label="HDL (Good Cholesterol)"
              value={formData.hdl}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="ldl"
              label="LDL (Bad Cholesterol)"
              value={formData.ldl}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <CardButton type="submit">
              Analyze
            </CardButton>
          </form>
        </FormContainer>
      </ContentContainer>
    </BackgroundBox>
  );
};

export default LipidPanelPage;
