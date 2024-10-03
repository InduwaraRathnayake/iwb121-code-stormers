import { useState, useRef, useEffect } from 'react';
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
  const [errors, setErrors] = useState({}); // Individual error states for each field
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
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error for specific input
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name} must be a valid number.` }));
    }
  };

  const validateInput = () => {
    const newErrors = {};
    // Check for empty fields and add to newErrors object
    for (const key in formData) {
      if (formData[key] === '') {
        newErrors[key] = `${key} cannot be empty.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
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
      setErrors({}); // Clear any previous errors
    } catch (error) {
      console.error('Error submitting data to the backend:', error);
      setErrors({ submit: 'Failed to send data to the backend.' });
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
            error={!!errors.fastingGlucose}
            helperText={errors.fastingGlucose}
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
            error={!!errors.randomGlucose}
            helperText={errors.randomGlucose}
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
            error={!!errors.hba1c}
            helperText={errors.hba1c}
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
                  color: item.color, // Set color based on interpretation
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
            
          </CardContent>
        </Card>
      )}
    </ContentContainer>
  );
};

export default BloodGlucoseTest;
