import { useState } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import { ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';

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

  const interpretResults = () => {
    const fasting = parseFloat(formData.fastingGlucose);
    const random = parseFloat(formData.randomGlucose);
    const hba1c = parseFloat(formData.hba1c);

    let interpretations = [];

    // Fasting Glucose Interpretation
    if (fasting < 70) {
      interpretations.push({
        text: "Fasting glucose is low, which can indicate:\n- Hypoglycemia: A condition where blood sugar levels drop too low.\n- Insulinoma: A rare tumor of the pancreas that secretes insulin.",
        color: 'blue'
      });
    } else if (fasting >= 70 && fasting <= 99) {
      interpretations.push({ text: "Fasting glucose is normal, indicating healthy glucose metabolism.", color: 'green' });
    } else if (fasting >= 100 && fasting <= 125) {
      interpretations.push({
        text: "Fasting glucose is elevated (Prediabetes): This condition is a warning sign for future diabetes, where glucose levels are higher than normal but not high enough for a diabetes diagnosis.",
        color: 'orange'
      });
    } else {
      interpretations.push({ text: "Fasting glucose is high (Diabetes): This indicates that you may have diabetes, requiring further testing and possibly medication.", color: 'red' });
    }

    // Random Glucose Interpretation
    if (random < 140) {
      interpretations.push({ text: "Random glucose is normal, suggesting good glucose regulation.", color: 'green' });
    } else if (random >= 140 && random <= 199) {
      interpretations.push({
        text: "Random glucose indicates Prediabetes: Elevated glucose levels can increase the risk of developing type 2 diabetes.",
        color: 'orange'
      });
    } else {
      interpretations.push({ text: "Random glucose indicates Diabetes: Persistent high levels may require medical intervention.", color: 'red' });
    }

    // HbA1c Interpretation
    if (hba1c < 5.7) {
      interpretations.push({ text: "HbA1c is normal, indicating well-controlled blood sugar levels.", color: 'green' });
    } else if (hba1c >= 5.7 && hba1c < 6.5) {
      interpretations.push({
        text: "HbA1c indicates Prediabetes: This is an important marker for long-term blood sugar control.",
        color: 'orange'
      });
    } else {
      interpretations.push({
        text: "HbA1c indicates Diabetes: Levels above 6.5% suggest poor blood sugar control and potential complications.",
        color: 'red'
      });
    }

    return interpretations;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return; // Prevent submission if validation fails
    }

    const interpretations = interpretResults();
    setReport(interpretations);
    setError(''); // Clear any previous errors
  };

  const saveToHistory = () => {
    if (!validateInput()) {
      return; // Prevent saving if validation fails
    }
    
    setHistory([...history, formData]);
    alert("Report details saved successfully!");
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
