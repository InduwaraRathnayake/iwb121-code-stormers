import { useState } from 'react';
import {TextField, Typography } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';
import {BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton} from '../../components/Card'

const CRPTestPage = () => {
  const [formData, setFormData] = useState({
    crpLevel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission logic here
  };

  return (
    <BackgroundBox backgroundImg={backgroundImg}>
      <ContentContainer>
        <TitleBox>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 900, fontSize: '50px', color: '#034c81' }}>
            C-Reactive Protein (CRP) Test Analyzer
          </Typography>
        </TitleBox>

        <FormContainer>
          <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="crpLevel"
              label="C-Reactive Protein Level (mg/L)"
              value={formData.crpLevel}
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

export default CRPTestPage;
