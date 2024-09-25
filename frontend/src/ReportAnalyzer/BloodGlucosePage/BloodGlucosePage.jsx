import { useState } from 'react';
import {TextField, Typography } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';
import {BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton} from '../../components/Card'

const BloodGlucoseTest = () => {
  const [formData, setFormData] = useState({
    fastingGlucose: '',
    randomGlucose: '',
    hba1c: ''
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
    <BackgroundBox backgroundImg={backgroundImg}>
      <ContentContainer>
        <TitleBox>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 900, fontSize: '50px', color: '#034c81' }}>
            Blood Glucose Test Analyzer
          </Typography>
        </TitleBox>

        <FormContainer>
          <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="fastingGlucose"
              label="Fasting Glucose (mg/dL)"
              value={formData.fastingGlucose}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }} // Add spacing between fields
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="randomGlucose"
              label="Random Glucose (mg/dL)"
              value={formData.randomGlucose}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }} // Add spacing between fields
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="hba1c"
              label="HbA1c (%)"
              value={formData.hba1c}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }} // Add spacing between fields
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

export default BloodGlucoseTest;
