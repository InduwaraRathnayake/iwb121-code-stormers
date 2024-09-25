import { useState } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import { BackgroundBox, ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';

const ThyroidFunctionTests = () => {
  const [formData, setFormData] = useState({
    tsh: '',
    t3: '',
    t4: '',
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Regex to allow only numbers and decimal points
    const regex = /^[0-9]*\.?[0-9]*$/;

    // Validate input
    if (value === '' || regex.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
      setError(''); // Clear error message
    } else {
      setError('Please enter a valid number');
    }
  };

  const interpretResults = () => {
    const { tsh, t3, t4 } = formData;
    let interpretation = [];

    // Interpret TSH level
    if (tsh < 4.0) {
      interpretation.push("TSH is low (Less than 4.0 mIU/L): Possible hyperthyroidism.");
    } else if (tsh >= 4.0 && tsh <= 5.0) {
      interpretation.push("TSH is normal (4.0 - 5.0 mIU/L): Healthy thyroid function.");
    } else {
      interpretation.push("TSH is high (More than 5.0 mIU/L): Possible hypothyroidism.");
    }

    // Interpret T3 level
    if (t3 < 0.8) {
      interpretation.push("T3 is low (Less than 0.8 ng/mL): Possible hypothyroidism.");
    } else if (t3 >= 0.8 && t3 <= 2.0) {
      interpretation.push("T3 is normal (0.8 - 2.0 ng/mL): Healthy thyroid function.");
    } else {
      interpretation.push("T3 is high (More than 2.0 ng/mL): Possible hyperthyroidism.");
    }

    // Interpret T4 level
    if (t4 < 4.5) {
      interpretation.push("T4 is low (Less than 4.5 µg/dL): Possible hypothyroidism.");
    } else if (t4 >= 4.5 && t4 <= 12.0) {
      interpretation.push("T4 is normal (4.5 - 12.0 µg/dL): Healthy thyroid function.");
    } else {
      interpretation.push("T4 is high (More than 12.0 µg/dL): Possible hyperthyroidism.");
    }

    return interpretation;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for empty inputs
    if (!formData.tsh || !formData.t3 || !formData.t4) {
      setError('All fields are required.');
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
          Thyroid Function Tests Analyzer
        </Typography>
      </TitleBox>

      <FormContainer>
        <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="tsh"
            label="TSH (mIU/L)"
            value={formData.tsh}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }} // Add spacing between fields
            error={!!error} // Display error state
            helperText={error} // Show error message
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="t3"
            label="T3 (ng/mL)"
            value={formData.t3}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
            error={!!error}
            helperText={error}
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="t4"
            label="T4 (µg/dL)"
            value={formData.t4}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
            error={!!error}
            helperText={error}
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
              type="button" // Change button type to prevent form submission
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

export default ThyroidFunctionTests;
