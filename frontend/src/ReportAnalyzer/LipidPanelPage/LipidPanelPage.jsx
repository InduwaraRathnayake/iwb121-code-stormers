import { useState } from 'react';
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
  const [error, setError] = useState(''); // State to manage error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^\d*\.?\d*$/; // regex to allow only numbers and decimal points

    // Only update state if the input value is valid according to the regex
    if (regex.test(value) || value === '') {
      setFormData({
        ...formData,
        [name]: value
      });
      setError(''); // Clear error on valid input
    } else {
      setError(`${name} must be a valid number.`);
    }
  };

  const validateInput = () => {
    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === '') {
        setError(`${key} cannot be empty.`);
        return false; // Return false if any field is empty
      }
    }
    return true; // Return true if all validations pass
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return; // Prevent submission if validation fails
    }
  
    // Convert the form data values to floats
    const requestData = {
      cholesterol: parseFloat(formData.cholesterol),
      triglycerides: parseFloat(formData.triglycerides),
      hdl: parseFloat(formData.hdl),
      ldl: parseFloat(formData.ldl)
    };
  
    try {
      // Send the requestData object to the backend using axios
      const response = await axios.post('http://localhost:9090/api/analyzeLipidPanel', requestData);
      console.log("🚀 ~ handleSubmit ~ response:", response)
  
      // Assuming you receive a JSON response with interpretations from the backend
      const interpretations = response.data;
      console.log("🚀 ~ handleSubmit ~ interpretations:", interpretations)
      setReport(interpretations);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error submitting data to the backend:', error);
      setError('Failed to send data to the backend.');
    }
  };

  const saveToHistory = () => {
    if (!validateInput()) {
      return; // Prevent saving if validation fails
    }
    
    setHistory([...history, formData]);
    alert('Report details saved successfully!');
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
              {report.map((item, index) => (
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
                  {item.text}
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
