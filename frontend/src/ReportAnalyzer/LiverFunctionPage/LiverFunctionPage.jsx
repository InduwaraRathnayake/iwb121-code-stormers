import { useState, useRef, useEffect } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import { ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';
import axios from 'axios';

const LiverFunctionTestsPage = () => {
  const [formData, setFormData] = useState({
    alt: '',
    ast: '',
    alp: '',
    bilirubin: '',
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState({}); // Updated to hold specific errors
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
      setError((prev) => ({ ...prev, [name]: '' })); // Clear error for the specific field
    } else {
      setError((prev) => ({ ...prev, [name]: `${name} must be a valid number.` })); // Set specific error
    }
  };

  const validateInput = () => {
    const newError = {}; // Create a new error object
    let isValid = true;

    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === '') {
        newError[key] = `${key} cannot be empty.`;
        isValid = false; // Mark as invalid if any field is empty
      }
    }

    setError(newError); // Set the new error state
    return isValid; // Return true if all validations pass
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return; // Prevent submission if validation fails
    }

    // Convert the form data values to floats
    const requestData = {
      alt: parseFloat(formData.alt),
      ast: parseFloat(formData.ast),
      alp: parseFloat(formData.alp),
      bilirubin: parseFloat(formData.bilirubin)
    };

    try {
      // Send the requestData object to the backend using axios
      const response = await axios.post('http://localhost:9090/api/analyzeLFT', requestData);
      console.log("🚀 ~ handleSubmit ~ response:", response);

      // Assuming you receive a JSON response with interpretations from the backend
      const interpretations = response.data;
      console.log("🚀 ~ handleSubmit ~ interpretations:", interpretations);
      setReport(interpretations);
      setError({}); // Clear any previous errors
    } catch (error) {
      console.error('Error submitting data to the backend:', error);
      setError({ general: 'Failed to send data to the backend.' });
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
            sx={{ marginBottom: '16px' }}
            error={!!error.alt} // Check for specific error
            helperText={error.alt} // Show specific error message
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
            error={!!error.ast}
            helperText={error.ast}
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
            error={!!error.alp}
            helperText={error.alp}
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
            error={!!error.bilirubin}
            helperText={error.bilirubin}
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

export default LiverFunctionTestsPage;
