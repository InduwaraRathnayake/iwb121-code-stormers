import { useState, useRef, useEffect } from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import {
  ContentContainer,
  TitleBox,
  FormContainer,
  CardButton,
} from "../../components/Card";
import axios from "axios";
import HospitalLogo from "../../assets/logo.png";
import generatePDF from "../../helpers/generatePDF";
import GetCookie from "../../hooks/getcookie"; // Utility to get the email from cookies
import decryptHash from "../../helpers/decrypting";
import { SECRET_KEY } from "../../helpers/constants";

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  marginTop: "20px",
                  marginLeft: "20px",
                }}
              >
                <img
                  src={HospitalLogo}
                  alt="Hospital Logo"
                  style={{ width: "100px" }}
                />
                <div style={{ textAlign: "right", marginLeft: "40px" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    WELLNESS 360
                  </Typography>
                  <Typography variant="body2">wellness360@gmail.com</Typography>
                  <Typography variant="body2">
                    University of Moratuwa
                  </Typography>
                  <Typography variant="body2">Phone: +94 123456789</Typography>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginLeft: "220px" }}
                  >
                    Patient Information
                  </Typography>
                  <Typography variant="body1">Name: {fullName}</Typography>
                  <Typography variant="body1">Email: {userEmail}</Typography>
                  <Typography variant="body1">Date: {currentDate}</Typography>
                </div>
              </div>
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Test</strong>
                    </TableCell>
                    <TableCell align="right" sx={{ width: "150px" }}>
                      <strong>Expected Range</strong>
                    </TableCell>
                    <TableCell align="right" sx={{ width: "150px" }}>
                      <strong>Your Result</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Status</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Fasting Glucose
                    </TableCell>
                    <TableCell align="right">
                      {expectedRanges.fastingGlucose}
                    </TableCell>
                    <TableCell align="right">
                      {formData.fastingGlucose}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report[0]?.color }}
                    >
                      {renderColoredCircle(report[0]?.color)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Random Glucose
                    </TableCell>
                    <TableCell align="right">
                      {expectedRanges.randomGlucose}
                    </TableCell>
                    <TableCell align="right">
                      {formData.randomGlucose}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report[1]?.color }}
                    >
                      {renderColoredCircle(report[1]?.color)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      HbA1c
                    </TableCell>
                    <TableCell align="right">{expectedRanges.hba1c}</TableCell>
                    <TableCell align="right">{formData.hba1c}</TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report[2]?.color }}
                    >
                      {renderColoredCircle(report[2]?.color)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", margin: "0 20px" }}
              >
                {ColoredCircle("red")}
                <Typography variant="body1" sx={{ marginLeft: "8px" }}>
                  High
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", margin: "0 20px" }}
              >
                {ColoredCircle("green")}
                <Typography variant="body1" sx={{ marginLeft: "8px" }}>
                  Normal
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", margin: "0 20px" }}
              >
                {ColoredCircle("blue")}
                <Typography variant="body1" sx={{ marginLeft: "8px" }}>
                  Low
                </Typography>
              </Box>
            </Box>

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
          <Typography
            variant="body1"
            sx={{
              color: "#004c8c",
              fontSize: "16px",
              lineHeight: "1.5",
              borderTop: "2px solid #004c8c",
              margin: "20px",
            }}
          >
            We appreciate your trust in our services. If you have any questions
            or require further assistance, please do not hesitate to contact us.
            <br />
            Explore our comprehensive range of offerings:{" "}
            <a
              href="http://localhost:5173/services"
              style={{
                color: "#004c8c",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              View Our Services
            </a>
          </Typography>
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

const ColoredCircle = (color) => (
  <span
    style={{
      display: "inline-block",
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      backgroundColor: color,
    }}
  ></span>
);