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
import generatePDF from "../../helpers/generatePDF";
import GetCookie from "../../hooks/getcookie"; 
import decryptHash from "../../helpers/decrypting";
import { SECRET_KEY } from "../../helpers/constants";
import ReportFooter from "../../components/Report/ReportFooter";
import ReportHeader from "../../components/Report/ReportHeader";

const CRPPage = () => {
  const [formData, setFormData] = useState({
    crpLevel: "",
  });

  const [report, setReport] = useState(null);
  const [error, setError] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const hashedemail = GetCookie("userEmail"); 
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
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } else {
      setError((prevErrors) => ({
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
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }

    const requestData = {
      crpLevel: parseFloat(formData.crpLevel),
    };

    try {
      const response = await axios.post(
        "http://localhost:9090/api/analyzeCRP",
        requestData
      );

      const interpretations = response.data.map((item) => ({
        test: item.test,
        expectedRange: item.expectedRange,
        result: item.result,
        text: item.text,
        color: item.color,
      }));

      setReport(interpretations);
      setError({});
    } catch (error) {
      console.error("Error submitting data to the backend:", error);
      setError({ general: "Failed to send data to the backend." });
    }
  };

  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [report]);

  const currentDate = new Date().toLocaleDateString();

  const expectedRanges = {
    crpLevel: "<5.0 mg/L", 
  };

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
          C-Reactive Protein (CRP) Report Analyzer
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
            name="crpLevel"
            label="CRP Level (mg/L)"
            value={formData.crpLevel}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
            error={!!error.crpLevel}
            helperText={error.crpLevel}
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
              Analysis of C-Reactive Protein (CRP) Test Results
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
                      CRP Level
                    </TableCell>
                    <TableCell align="right">
                      {expectedRanges.crpLevel}
                    </TableCell>
                    <TableCell align="right">
                      {formData.crpLevel} mg/L
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report?.[0]?.color }}
                    >
                      {renderColoredCircle(report?.[0]?.color)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Status Legend Section */}
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
                    marginBottom: "20px",
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
      {/* Display error messages if there are any */}
      {Object.keys(error).length > 0 && (
        <div style={{ color: "red", marginTop: "20px" }}>
          {Object.values(error).map((errMsg, index) => (
            <div key={index}>{errMsg}</div>
          ))}
        </div>
      )}
    </ContentContainer>
  );
};

const renderColoredCircle = (color) => {
  if (!color) return null;
  return (
    <span
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    ></span>
  );
};

const ColoredCircle = (color) => (
  <span
    style={{
      display: "inline-block",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: color,
      marginRight: "5px",
    }}
  ></span>
);

export default CRPPage;