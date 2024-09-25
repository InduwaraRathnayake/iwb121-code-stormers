import { useState } from 'react';
import { TextField, Typography, Card, CardContent, Button } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';
import { BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';

const CRPTestPage = () => {
  const [formData, setFormData] = useState({
    crpLevel: '',
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const interpretResults = () => {
    const crp = parseFloat(formData.crpLevel);
    let interpretation = '';

    if (crp < 1) {
      interpretation = {
        text: "CRP level is normal (Less than 1 mg/L): Indicates low risk for cardiovascular disease.",
        color: 'green',
      };
    } else if (crp >= 1 && crp <= 3) {
      interpretation = {
        text: "CRP level is mildly elevated (1-3 mg/L): May indicate a moderate risk for cardiovascular disease.",
        color: 'orange',
      };
    } else {
      interpretation = {
        text: "CRP level is high (Greater than 3 mg/L): Indicates a higher risk for cardiovascular disease and possible inflammation in the body. Further evaluation is recommended.",
        color: 'red',
      };
    }

    return interpretation;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const interpretation = interpretResults();
    setReport(interpretation);
  };

  const saveToHistory = () => {
    setHistory([...history, formData]);
    alert("Report details saved successfully!");
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

        {/* Report Card Section */}
        {report && (
          <Card 
            sx={{ 
              marginTop: '40px', 
              padding: '20px', 
              border: '1px solid #004c8c', 
              borderRadius: '20px', 
              width: '600px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
              backgroundColor: 'rgba(255, 255, 255,0.9)', 
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#004c8c', 
                  fontSize: '30px', 
                  marginBottom: '30px', 
                  textAlign: 'center', 
                  padding: '8px', 
                  borderRadius: '4px' 
                }}
              >
                Analyzation of Results
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  marginTop: '16px', 
                  color: '#0A2472',
                  fontSize: '16px', 
                  lineHeight: '1.5', 
                  textAlign: 'left' 
                }} 
              >
                {report.text}
              </Typography>
              <CardButton 
              type="submit"
              onClick={saveToHistory}
            >
              Save report details 
            </CardButton>
            </CardContent>
          </Card>
        )}
      </ContentContainer>
    </BackgroundBox>
  );
};

export default CRPTestPage;
