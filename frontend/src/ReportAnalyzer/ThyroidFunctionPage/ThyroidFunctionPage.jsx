import { useState, useRef, useEffect } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import { ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';
import axios from 'axios';

const ThyroidFunctionTests = () => {
  const [formData, setFormData] = useState({
    tsh: '',
    t3: '',
    t4: '',
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState({
    tsh: '',
    t3: '',
    t4: '',
  });
  const reportRef = useRef(null); // Reference for the report card

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^\d*\.?\d*$/; // regex to allow only numbers and decimal points

    // Only update state if the input value is valid according to the regex
    if (regex.test(value) || value === '') {
      setFormData({
        ...formData,
        [name]: value
      });
      setError((prevError) => ({
        ...prevError,
        [name]: '' // Clear error for the specific field on valid input
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [name]: `${name} must be a valid number.`
      }));
    }
  };

  const validateInput = () => {
    let isValid = true;
    const newError = {
      tsh: '',
      t3: '',
      t4: '',
    };

    // Check for empty fields and update error state
    for (const key in formData) {
      if (formData[key] === '') {
        newError[key] = `${key} cannot be empty.`;
        isValid = false;
      }
    }

    setError(newError); // Update the error state
    return isValid; // Return whether the validation passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return; // Prevent submission if validation fails
    }
  
    // Convert the form data values to floats
    const requestData = {
      tsh: parseFloat(formData.tsh),
      t3: parseFloat(formData.t3),
      t4: parseFloat(formData.t4)
    };
  
    try {
      // Send the requestData object to the backend using axios
      const response = await axios.post('http://localhost:9090/api/analyzeTFT', requestData);
      console.log("🚀 ~ handleSubmit ~ response:", response)
  
      // Assuming you receive a JSON response with interpretations from the backend
      const interpretations = response.data;
      console.log("🚀 ~ handleSubmit ~ interpretations:", interpretations)
      setReport(interpretations);
      setError({ tsh: '', t3: '', t4: '' }); // Clear any previous errors
    } catch (error) {
      console.error('Error submitting data to the backend:', error);
      setError({ tsh: '', t3: '', t4: 'Failed to send data to the backend.' });
    }
  };

  const saveToHistory = () => {
    if (!validateInput()) {
      return; // Prevent saving if validation fails
    }
    
    setHistory([...history, formData]);
    alert('Report details saved successfully!');
  };

  // Scroll to the report card when the report is updated
  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [report]);

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
            error={!!error.tsh} // Display error state for TSH
            helperText={error.tsh} // Show error message for TSH
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
            error={!!error.t3} // Display error state for T3
            helperText={error.t3} // Show error message for T3
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
            error={!!error.t4} // Display error state for T4
            helperText={error.t4} // Show error message for T4
          />
          <CardButton type="submit">
            Analyze
          </CardButton>
        </form>
      </FormContainer>

      {/* Report Card Section */}
      {report && (
        <Card 
          ref={reportRef} // Reference to the report card
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
                  color:  item.color,
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

export default ThyroidFunctionTests;
