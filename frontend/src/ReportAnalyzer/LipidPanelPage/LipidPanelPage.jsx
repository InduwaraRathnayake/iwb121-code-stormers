import { useState, useRef, useEffect } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import { ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';
import axios from 'axios';

const LipidPanelPage = () => {
  const [formData, setFormData] = useState({
    cholesterol: '',
    triglycerides: '',
    hdl: '',
    ldl: '',
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState({}); // State to manage error messages for each field
  const reportRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^\d*\.?\d*$/;

    // Update the state if the input value is valid according to the regex
    if (regex.test(value) || value === '') {
      setFormData({
        ...formData,
        [name]: value
      });
      setError(prev => ({ ...prev, [name]: '' })); // Clear error for the specific field
    } else {
      setError(prev => ({ ...prev, [name]: `${name} must be a valid number.` })); // Set error for the specific field
    }
  };

  const validateInput = () => {
    let isValid = true;
    const newError = {}; // Create an object to hold error messages for each field

    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === '') {
        newError[key] = `${key} cannot be empty.`;
        isValid = false; // Set isValid to false if any field is empty
      }
    }

    setError(newError); // Update the error state with the new errors
    return isValid; // Return true if all validations pass
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return; // Prevent submission if validation fails
    }

    const requestData = {
      cholesterol: parseFloat(formData.cholesterol),
      triglycerides: parseFloat(formData.triglycerides),
      hdl: parseFloat(formData.hdl),
      ldl: parseFloat(formData.ldl)
    };

    try {
      const response = await axios.post('http://localhost:9090/api/analyzeLipidPanel', requestData);
      console.log("🚀 ~ handleSubmit ~ response:", response);

      const interpretations = response.data;
      console.log("🚀 ~ handleSubmit ~ interpretations:", interpretations);
      setReport(interpretations);
      setError({}); // Clear all errors on successful submission
    } catch (error) {
      console.error('Error submitting data to the backend:', error);
      setError({ general: 'Failed to send data to the backend.' }); // Handle general error
    }
  };

  const saveToHistory = () => {
    if (!validateInput()) {
      return; // Prevent saving if validation fails
    }

    setHistory([...history, formData]);
    alert('Report details saved successfully!');
  };

  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [report]);

  return (
    <ContentContainer>
      <TitleBox>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 900, fontSize: '50px', color: '#034c81' }}>
          Lipid Panel Report Analyzer
        </Typography>
      </TitleBox>

      <FormContainer>
        <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
          {['cholesterol', 'triglycerides', 'hdl', 'ldl'].map((field) => (
            <TextField
              key={field}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              name={field}
              label={`${field.charAt(0).toUpperCase() + field.slice(1)} (mg/dL)`}
              value={formData[field]}
              onChange={handleChange}
              error={!!error[field]} // Show error styling if there's an error for this field
              helperText={error[field]} // Display specific error message for this field
              sx={{ marginBottom: '16px' }}
            />
          ))}
          <CardButton type="submit">
            Analyze
          </CardButton>
        </form>
      </FormContainer>

      {/* Report Card Section */}
      {report && (
        <Card 
          ref={reportRef}
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
            {report.map((item, index) => (
              <Typography 
                key={index} 
                variant="body1" 
                sx={{ 
                  marginTop: '16px', 
                  color: item.color,
                  fontSize: '16px', 
                  lineHeight: '1.5', 
                  textAlign: 'left' 
                }} 
              >
                {item.text}
              </Typography>
            ))}
            
          </CardContent>
        </Card>
      )}
    </ContentContainer>
  );
};

export default LipidPanelPage;
