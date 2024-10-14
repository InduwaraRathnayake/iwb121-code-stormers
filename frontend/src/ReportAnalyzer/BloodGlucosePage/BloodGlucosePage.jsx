import { useState, useRef, useEffect } from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import {
  ContentContainer,
  TitleBox,
  FormContainer,
  CardButton,
} from "../../components/Card";
import axios from "axios";
import generatePDF from "../../helpers/generatePDF";
import GetCookie from "../../hooks/getcookie"; 
import decryptHash from "../../helpers/decrypting";
import { SECRET_KEY } from "../../helpers/constants";
import ReportFooter from "../../components/Report/ReportFooter";
import ReportHeader from "../../components/Report/ReportHeader";
import StatusLegend from "../../components/Report/StatusLegend";
import ReportTable from "../../components/Report/ReportTable";

const BloodGlucoseTest = () => {
  const [formData, setFormData] = useState({
    fastingGlucose: "",
    randomGlucose: "",
    hba1c: "",
  });

  const [report, setReport] = useState(null);
  const [errors, setErrors] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const reportRef = useRef(null);

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const hashedemail = GetCookie("userEmail"); // Get email from cookies
        const email = decryptHash(hashedemail, SECRET_KEY);
        const response = await axios.post("http://localhost:9090/api/userByEmail", { email });
        const { firstName, lastName } = response.data;
        setUserEmail(email);
        setFullName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^\d*\.?\d*$/;

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

  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [report]);

  const expectedRanges = {
    fastingGlucose: "70-100 mg/dL",
    randomGlucose: "70-140 mg/dL",
    hba1c: "4-5.6%",
  };

  const renderColoredCircle = (color) => (
    <span
      style={{
        display: "inline-block",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    ></span>
  );

  const getPDF = () => {
    generatePDF(reportRef);
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

      <br /> <br />
      {report && (
        <Card
          ref={reportRef}
          sx={{
            border: "1px solid #004c8c",
            width: "100%",
            maxWidth: "800px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(255, 255, 255,0.9)",
          }}
        >
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                backgroundColor: "#c6e6fb",
              }}
            >
               <ReportHeader fullName={fullName} userEmail={userEmail} currentDate={currentDate} />
            </div>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                color: "#004c8c",
                fontSize: "28px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Analysis of Blood Glucose Test Results
            </Typography>

            <ReportTable
          headers={["Test", "Expected Range", "Your Result", "Status"]}
          rows={[
            [
              "Fasting Glucose",
              expectedRanges.fastingGlucose, 
              `${formData.fastingGlucose} mg/dL`,
              renderColoredCircle(report?.[0]?.color),
            ],
            [
              "Random Glucose",
              expectedRanges.fastingGlucose, 
              `${formData.randomGlucose} mg/dL`,
              renderColoredCircle(report?.[1]?.color),
            ],
            [
              "HbA1c",
              expectedRanges.fastingGlucose, 
              `${formData.hba1c} %`,
              renderColoredCircle(report?.[2]?.color),
            ],
          ]}
        />
      

            <StatusLegend />

            <Box sx={{ marginTop: "30px", textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#004c8c",
                  fontSize: "24px",
                  marginBottom: "16px",
                }}
              >
                Analysis Summary
              </Typography>

              {report.map((item) => (
                <Typography
                  key={item.text}
                  variant="body2"
                  sx={{
                    textAlign: "left",
                    marginLeft: "8px",
                    fontSize: "16px",
                    lineHeight: "1.5",
                  }}
                >
                  • {item.text}
                </Typography>
              ))}
            </Box>
          </CardContent>
          <ReportFooter />
        </Card>
      )}
      {/* PDF Generation Button */}
      {report && (
        <div style={{ textAlign: "center" }}>
          <CardButton onClick={getPDF} type="button">
            Download Report as PDF
          </CardButton>
        </div>
      )}
      {errors.submit && (
        <Typography color="error" align="center" sx={{ marginTop: "10px" }}>
          {errors.submit}
        </Typography>
      )}
    </ContentContainer>
  );
};

export default BloodGlucoseTest;
