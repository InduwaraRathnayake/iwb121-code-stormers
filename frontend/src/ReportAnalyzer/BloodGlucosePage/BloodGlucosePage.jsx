import { useState } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import { ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';
import axios from 'axios';

const BloodGlucoseTest = () => {
  const [formData, setFormData] = useState({
    fastingGlucose: '',
    randomGlucose: '',
    hba1c: ''
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(''); // Single error state

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
      fastingGlucose: parseFloat(formData.fastingGlucose),
      randomGlucose: parseFloat(formData.randomGlucose),
      hba1c: parseFloat(formData.hba1c)
    };
  
    try {
      // Send the requestData object to the backend using axios
      const response = await axios.post('http://localhost:9090/api/analyzeBloodGlucose', requestData);
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
            error={!!error}
            helperText={error}
            sx={{ marginBottom: '16px' }}
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
            error={!!error}
            helperText={error}
            sx={{ marginBottom: '16px' }}
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
                  color: item.color === 'red' ? 'red' : '#0A2472', // Set color based on interpretation
                  fontSize: '16px',
                  lineHeight: '1.5',
                  listStyleType: 'disc',
                  paddingLeft: '20px',
                  textAlign: 'left'
                }}
              >
                {item.text}
              </Typography>
            ))}
            <CardButton
              type="button" // Changed to prevent form submission
              onClick={saveToHistory}
            >
              Save Report Details
            </CardButton>
          </CardContent>
        </Card>
      )}
    </ContentContainer>
  );
};

export default BloodGlucoseTest;
