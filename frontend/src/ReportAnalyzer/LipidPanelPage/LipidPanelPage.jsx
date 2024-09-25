import { useState } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import { BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';

const LipidPanelPage = () => {
  const [formData, setFormData] = useState({
    cholesterol: '',
    triglycerides: '',
    hdl: '',
    ldl: '',
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(''); // State to manage error messages

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Regex to allow only numbers and decimal points
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(value) || value === '') {
      setFormData({
        ...formData,
        [name]: value,
      });
      setError(''); // Clear error if input is valid
    } else {
      setError('Invalid input! Please enter a valid number.');
    }
  };

  const interpretResults = () => {
    const { cholesterol, triglycerides, hdl, ldl } = formData;
    let interpretation = [];

    // Interpret cholesterol level
    if (cholesterol < 200) {
      interpretation.push("Total Cholesterol is normal (Less than 200 mg/dL): Good heart health.");
    } else if (cholesterol >= 200 && cholesterol <= 239) {
      interpretation.push("Total Cholesterol is borderline high (200-239 mg/dL): Risk for heart disease may be present.");
    } else {
      interpretation.push("Total Cholesterol is high (240 mg/dL and above): Increased risk for heart disease.");
    }

    // Interpret triglycerides level
    if (triglycerides < 150) {
      interpretation.push("Triglycerides are normal (Less than 150 mg/dL).");
    } else if (triglycerides >= 150 && triglycerides < 199) {
      interpretation.push("Triglycerides are borderline high (150-199 mg/dL).");
    } else {
      interpretation.push("Triglycerides are high (200 mg/dL and above).");
    }

    // Interpret HDL level
    if (hdl < 40) {
      interpretation.push("HDL (Good Cholesterol) is low (Less than 40 mg/dL): Risk factor for heart disease.");
    } else if (hdl >= 40 && hdl < 60) {
      interpretation.push("HDL (Good Cholesterol) is acceptable (40-60 mg/dL).");
    } else {
      interpretation.push("HDL (Good Cholesterol) is high (60 mg/dL and above): Protective against heart disease.");
    }

    // Interpret LDL level
    if (ldl < 100) {
      interpretation.push("LDL (Bad Cholesterol) is optimal (Less than 100 mg/dL).");
    } else if (ldl >= 100 && ldl < 129) {
      interpretation.push("LDL (Bad Cholesterol) is near optimal (100-129 mg/dL).");
    } else if (ldl >= 130 && ldl < 159) {
      interpretation.push("LDL (Bad Cholesterol) is borderline high (130-159 mg/dL).");
    } else if (ldl >= 160 && ldl < 189) {
      interpretation.push("LDL (Bad Cholesterol) is high (160-189 mg/dL).");
    } else {
      interpretation.push("LDL (Bad Cholesterol) is very high (190 mg/dL and above): High risk for heart disease.");
    }

    return interpretation;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some(value => value === '')) {
      setError('Please fill in all fields.'); // Set error if any field is empty
      return;
    }
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
              label="Total Cholesterol (mg/dL)"
              value={formData.cholesterol}
              onChange={handleChange}
              error={!!error} // Set error state to show error styling
              helperText={error} // Display error message
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="triglycerides"
              label="Triglycerides (mg/dL)"
              value={formData.triglycerides}
              onChange={handleChange}
              error={!!error}
              helperText={error}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="hdl"
              label="HDL (Good Cholesterol) (mg/dL)"
              value={formData.hdl}
              onChange={handleChange}
              error={!!error}
              helperText={error}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name="ldl"
              label="LDL (Bad Cholesterol) (mg/dL)"
              value={formData.ldl}
              onChange={handleChange}
              error={!!error}
              helperText={error}
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
                type="button" // Changed type to button to prevent form submission
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

export default LipidPanelPage;
