import { useState, useRef, useEffect } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import { ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';
import axios from 'axios';

const FBCPage = () => {
  const [formData, setFormData] = useState({
    whiteBloodCells: '',
    redBloodCells: '',
    platelets: '',
    hemoglobin: ''
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState({}); // Object to track errors for each field
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
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: '' // Clear error for this field on valid input
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} must be a valid number.` // Set error for this field
      }));
    }
  };

  const validateInput = () => {
    const newErrors = {}; // Create a new error object
    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === '') {
        newErrors[key] = `${key} cannot be empty.`; // Add error for this field
      }
    }
    setError(newErrors); // Update the error state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return; // Prevent submission if validation fails
    }

    // Convert the form data values to floats
    const requestData = {
      whiteBloodCells: parseFloat(formData.whiteBloodCells),
      redBloodCells: parseFloat(formData.redBloodCells),
      platelets: parseFloat(formData.platelets),
      hemoglobin: parseFloat(formData.hemoglobin)
    };

    try {
      // Send the requestData object to the backend using axios
      const response = await axios.post('http://localhost:9090/api/analyzeFBC', requestData);
      console.log("🚀 ~ handleSubmit ~ response:", response)

      // Assuming you receive a JSON response with interpretations from the backend
      const interpretations = response.data;
      console.log("🚀 ~ handleSubmit ~ interpretations:", interpretations)
      setReport(interpretations);
      setError({}); // Clear any previous errors
    } catch (error) {
      console.error('Error submitting data to the backend:', error);
      setError({ general: 'Failed to send data to the backend.' }); // Set general error
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
          Full Blood Count Report Analyzer
        </Typography>
      </TitleBox>

      <FormContainer>
        <form onSubmit={handleSubmit} className="form" style={{ width: '100%' }}>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="whiteBloodCells"
            label="White Blood Cells (10^9/L)"
            value={formData.whiteBloodCells}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
            error={!!error.whiteBloodCells} // Show error state if this field has an error
            helperText={error.whiteBloodCells} // Show error message for this field
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="redBloodCells"
            label="Red Blood Cells (10^12/L)"
            value={formData.redBloodCells}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
            error={!!error.redBloodCells} // Show error state if this field has an error
            helperText={error.redBloodCells} // Show error message for this field
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="hemoglobin"
            label="Hemoglobin (g/L)"
            value={formData.hemoglobin}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
            error={!!error.hemoglobin} // Show error state if this field has an error
            helperText={error.hemoglobin} // Show error message for this field
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="platelets"
            label="Platelets (10^9/L)"
            value={formData.platelets}
            onChange={handleChange}
            sx={{ marginBottom: '16px' }}
            error={!!error.platelets} // Show error state if this field has an error
            helperText={error.platelets} // Show error message for this field
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
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Added shadow for depth
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
                  listStyleType: 'disc',
                  paddingLeft: '20px',
                  textAlign: 'left',
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

export default FBCPage;
