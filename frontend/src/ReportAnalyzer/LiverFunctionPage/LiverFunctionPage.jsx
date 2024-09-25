import { useState } from 'react';
import {TextField, Typography } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';
import {BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton} from '../../components/Card'

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
    <BackgroundBox backgroundImg={backgroundImg}>
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
            <CardButton type="submit">
              Analyze
            </CardButton>
          </form>
        </FormContainer>
      </ContentContainer>
    </BackgroundBox>
  );
};

export default LiverFunctionTestsPage;
