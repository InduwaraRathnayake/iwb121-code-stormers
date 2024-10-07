import { useState, useRef, useEffect } from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  ContentContainer,
  TitleBox,
  FormContainer,
  CardButton,
} from "../../components/Card";
import axios from "axios";
import html2pdf from "html2pdf.js";

const BloodGlucoseTest = () => {
  const [formData, setFormData] = useState({
    fastingGlucose: "",
    randomGlucose: "",
    hba1c: "",
  });

  const [report, setReport] = useState(null);
  const [errors, setErrors] = useState({});
  const reportRef = useRef(null); // Reference for the report card

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^\d*\.?\d*$/; // regex to allow only numbers and decimal points

    if (regex.test(value) || value === "") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for specific input
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} must be a valid number.`,
      }));
    }
  };

  const validateInput = () => {
    const newErrors = {};
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = `${key} cannot be empty.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }

    const requestData = {
      fastingGlucose: parseFloat(formData.fastingGlucose),
      randomGlucose: parseFloat(formData.randomGlucose),
      hba1c: parseFloat(formData.hba1c),
    };

    try {
      const response = await axios.post(
        "http://localhost:9090/api/analyzeBloodGlucose",
        requestData
      );
      const interpretations = response.data;
      setReport(interpretations);
      setErrors({});
    } catch (error) {
      console.error("Error submitting data to the backend:", error);
      setErrors({ submit: "Failed to send data to the backend." });
    }
  };

  const generatePDF = () => {
    const element = reportRef.current;

    const pdfOptions = {
        margin:       0,
        filename:     'report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Create a new div element with the same structure
    const pdfContent = document.createElement('div');
    pdfContent.innerHTML = `
        <div style="text-align: center; width: 100%; padding: 20px; border: 1px solid #004c8c; border-radius: 20px; background-color: rgba(255, 255, 255, 0.9);">
            ${element.innerHTML}
        </div>
    `;

    // Generate PDF
    html2pdf()
        .from(pdfContent)
        .set(pdfOptions)
        .save();
};


  return (
    <ContentContainer>
      <TitleBox>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 900, fontSize: "50px", color: "#034c81" }}
        >
          Blood Glucose Test Analyzer
        </Typography>
      </TitleBox>

      <FormContainer>
        <form
          onSubmit={handleSubmit}
          className="form"
          style={{ width: "100%" }}
        >
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
            sx={{ marginBottom: "16px" }}
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
            sx={{ marginBottom: "16px" }}
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
            sx={{ marginBottom: "16px" }}
          />
          <CardButton type="submit">Analyze</CardButton>
        </form>
      </FormContainer>

      {report && (
        <>
          <Card
            ref={reportRef}
            sx={{
              margin: "40px auto", // Center the card
              padding: "20px",
              border: "1px solid #004c8c",
              borderRadius: "20px",
              width: "600px", // Set a fixed width for the card
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#004c8c",
                  fontSize: "30px",
                  marginBottom: "30px",
                  textAlign: "center",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                Analyzation of Results
              </Typography>
              {report.map((item, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    marginTop: "16px",
                    color: item.color,
                    fontSize: "16px",
                    lineHeight: "1.5",
                    listStyleType: "disc",
                    paddingLeft: "20px",
                    textAlign: "left",
                  }}
                >
                  {item.text}
                </Typography>
              ))}
            </CardContent>
          </Card>

          {/* PDF Generation Button */}
          <div style={{ textAlign: "center" }}>
            <CardButton
              onClick={generatePDF}
              type="button"
            >
              Download PDF
            </CardButton>
          </div>
        </>
      )}
    </ContentContainer>
  );
};

export default BloodGlucoseTest;
