import { useState } from 'react';
import { TextField, Typography, Card, CardContent, Button } from '@mui/material';
import {ContentContainer, TitleBox, FormContainer, CardButton } from '../../components/Card';

const FBCPage = () => {
  const [formData, setFormData] = useState({
    whiteBloodCells: '',
    redBloodCells: '',
    platelets: '',
    hemoglobin: ''
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const interpretResults = () => {
    const wbc = parseFloat(formData.whiteBloodCells);
    const rbc = parseFloat(formData.redBloodCells);
    const hgb = parseFloat(formData.hemoglobin);
    const platelets = parseFloat(formData.platelets);

    let interpretations = [];

    // WBC Interpretation
    if (wbc < 4.5) {
      interpretations.push({ 
        text: " White Blood Cell count is low, indicating potential issues such as:\n  - Bone marrow disorders\n  - Autoimmune diseases\n  - Certain infections\n  - Chronic fatigue", 
        color: 'blue' 
      });
    } else if (wbc > 11) {
      interpretations.push({ 
        text: " White Blood Cell count is high, suggesting possible conditions like:\n  - Ongoing infections\n  - Inflammation\n  - Stress responses\n  - Allergic reactions", 
        color: 'red' 
      });
    } else {
      interpretations.push({ text: " White Blood Cell count is normal, indicating a healthy immune system.", color: 'green' });
    }

    // RBC Interpretation
    if (rbc < 4.1) {
      interpretations.push({ 
        text: "Red Blood Cell count is low, which could be due to:\n  - Anemia\n  - Blood loss\n  - Nutritional deficiencies\n  - Bone marrow issues", 
        color: 'blue' 
      });
    } else if (rbc > 6.1) {
      interpretations.push({ 
        text: " Red Blood Cell count is high, often related to:\n  - Dehydration\n  - Increased production due to low oxygen levels\n  - Chronic lung diseases", 
        color: 'red' 
      });
    } else {
      interpretations.push({ text: " Red Blood Cell count is normal, suggesting a balanced oxygen transport capacity.", color: 'green' });
    }

    // Hemoglobin Interpretation
    if (hgb < 13.8) {
      interpretations.push({ 
        text: " Hemoglobin level is low, which may lead to:\n  - Fatigue\n  - Weakness\n  - Paleness\n  - Symptoms related to iron deficiency", 
        color: 'blue' 
      });
    } else if (hgb > 17.2) {
      interpretations.push({ 
        text: " Hemoglobin level is high, which can result from:\n  - Dehydration\n  - Lung diseases\n  - Heart diseases\n  - Increased physical training", 
        color: 'red' 
      });
    } else {
      interpretations.push({ text: "Hemoglobin level is normal, indicating effective oxygen transportation in the blood.", color: 'green' });
    }

    // Platelets Interpretation
    if (platelets < 150) {
      interpretations.push({ 
        text: " Platelet count is low (Thrombocytopenia), possibly caused by:\n  - Bone marrow disorders\n  - Autoimmune diseases\n  - Certain medications\n  - Severe infections\n  - Symptoms may include easy bruising, prolonged bleeding, and petechiae.", 
        color: 'blue' 
      });
    } else if (platelets > 400) {
      interpretations.push({ 
        text: "Platelet count is high (Thrombocytosis), which may indicate:\n  - Bone marrow disorders\n  - Chronic inflammatory conditions\n  - Iron deficiency\n  - Symptoms can include increased risk of blood clots and possible bleeding complications.", 
        color: 'red' 
      });
    } else {
      interpretations.push({ text: " Platelet count is normal, indicating a healthy coagulation process.", color: 'green' });
    }

    return interpretations;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const interpretations = interpretResults();
    setReport(interpretations);
  };

  const saveToHistory = () => {
    setHistory([...history, formData]);
  };

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
      color: '#0A2472',
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
              type="submit"
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

export default FBCPage;
