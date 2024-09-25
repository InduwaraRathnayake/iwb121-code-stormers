import { useState } from 'react';
import {TextField, Typography } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';
import {BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton} from '../../components/Card'


const FBCPage = () => {
  const [formData, setFormData] = useState({
    whiteBloodCells: '',
    redBloodCells: '',
    platelets: '',
    hemoglobin: ''
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
    // Handle form submission, e.g., send the data to the backend.
  };

  return (
    <BackgroundBox backgroundImg={backgroundImg}>
      <ContentContainer>
        <TitleBox>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 900, fontSize: '50px', color: '#034c81' }}>
            Full Blood Count Report Analyzer
          </Typography>
        </TitleBox>

        <FormContainer>
          <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="whiteBloodCells"
              label="White Blood Cells (10^9/L)"
              value={formData.whiteBloodCells}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }} // Add spacing between fields
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="redBloodCells"
              label="Red Blood Cells (10^12/L)"
              value={formData.redBloodCells}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="hemoglobin"
              label="Hemoglobin (g/L)"
              value={formData.hemoglobin}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="platelets"
              label="Platelets (10^9/L)"
              value={formData.platelets}
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

export default FBCPage;
