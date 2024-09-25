import { useState } from 'react';
import { TextField, Typography, Card, CardContent, Button } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';
import { BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';

const LiverFunctionTestsPage = () => {
  const [formData, setFormData] = useState({
    alt: '',
    ast: '',
    alp: '',
    bilirubin: '',
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
    const { alt, ast, alp, bilirubin } = formData;
    let interpretation = [];

    // Interpret ALT level
    if (alt < 40) {
      interpretation.push("ALT is normal (Less than 40 U/L): Healthy liver function.");
    } else {
      interpretation.push("ALT is elevated (40 U/L and above): Possible liver damage or inflammation.");
    }

    // Interpret AST level
    if (ast < 40) {
      interpretation.push("AST is normal (Less than 40 U/L): Healthy liver function.");
    } else {
      interpretation.push("AST is elevated (40 U/L and above): Possible liver damage or disease.");
    }

    // Interpret ALP level
    if (alp < 120) {
      interpretation.push("ALP is normal (Less than 120 U/L): Healthy liver and bone function.");
    } else {
      interpretation.push("ALP is elevated (120 U/L and above): Possible bile duct obstruction or liver disease.");
    }

    // Interpret Bilirubin level
    if (bilirubin < 1.2) {
      interpretation.push("Bilirubin is normal (Less than 1.2 mg/dL): Healthy liver function.");
    } else {
      interpretation.push("Bilirubin is elevated (1.2 mg/dL and above): Possible liver disease or bile duct obstruction.");
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
              label="ALT (U/L)"
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
              label="AST (U/L)"
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
              label="ALP (U/L)"
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
              label="Bilirubin (mg/dL)"
              value={formData.bilirubin}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
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
              {report.map((text, index) => (
                <Typography 
                  key={index} 
                  variant="body1" 
                  sx={{ 
                    marginTop: '16px', 
                    color: '#0A2472',
                    fontSize: '16px', 
                    lineHeight: '1.5', 
                    textAlign: 'left' 
                  }} 
                >
                  {text}
                </Typography>
              ))}
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
  );
};

export default LiverFunctionTestsPage;
