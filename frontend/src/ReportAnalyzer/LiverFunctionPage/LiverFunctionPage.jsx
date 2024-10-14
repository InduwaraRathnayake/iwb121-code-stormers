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
import StatusLegend from "../../components/Report/StatusLegend";

const LiverFunctionTestsPage = () => {
  const [formData, setFormData] = useState({
    alt: "",
    ast: "",
    alp: "",
    bilirubin: "",
  });

  const [report, setReport] = useState(null);
  const [error, setError] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const reportRef = useRef(null);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const hashedemail = GetCookie("userEmail"); // Get email from cookies
        const email = decryptHash(hashedemail, SECRET_KEY);
        const response = await axios.post(
          "http://localhost:9090/api/userByEmail",
          { email }
        );
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
      setError((prev) => ({ ...prev, [name]: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: `${name} must be a valid number.`,
      }));
    }
  };

  const validateInput = () => {
    const newError = {};
    let isValid = true;

    for (const key in formData) {
      if (formData[key] === "") {
        newError[key] = `${key} cannot be empty.`;
        isValid = false;
      }
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }

    const requestData = {
      alt: parseFloat(formData.alt),
      ast: parseFloat(formData.ast),
      alp: parseFloat(formData.alp),
      bilirubin: parseFloat(formData.bilirubin),
    };

    try {
      const response = await axios.post(
        "http://localhost:9090/api/analyzeLFT",
        requestData
      );

      const interpretations = response.data;
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

  const expectedRanges = {
    alt: "7 - 56 U/L",
    ast: "10 - 40 U/L",
    alp: "44 - 147 U/L",
    bilirubin: "0.3 - 1.2 mg/dL",
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
          Liver Function Tests Analyzer
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
            name="alt"
            label="ALT (U/L)"
            value={formData.alt}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
            error={!!error.alt}
            helperText={error.alt}
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
            sx={{ marginBottom: "16px" }}
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
            sx={{ marginBottom: "16px" }}
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
            sx={{ marginBottom: "16px" }}
            error={!!error.bilirubin}
            helperText={error.bilirubin}
          />
          <CardButton type="submit">Analyze</CardButton>
        </form>
      </FormContainer>

      <br></br>
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
              Analysis of Liver Function Test Results
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
                    <TableCell>ALT</TableCell>
                    <TableCell align="right">{expectedRanges.alt}</TableCell>
                    <TableCell align="right">{formData.alt}</TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report[0]?.color }}
                    >
                      {renderColoredCircle(report[0]?.color)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>AST</TableCell>
                    <TableCell align="right">{expectedRanges.ast}</TableCell>
                    <TableCell align="right">{formData.ast}</TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report[1]?.color }}
                    >
                      {renderColoredCircle(report[1]?.color)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ALP</TableCell>
                    <TableCell align="right">{expectedRanges.alp}</TableCell>
                    <TableCell align="right">{formData.alp}</TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report[2]?.color }}
                    >
                      {renderColoredCircle(report[2]?.color)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bilirubin</TableCell>
                    <TableCell align="right">
                      {expectedRanges.bilirubin}
                    </TableCell>
                    <TableCell align="right">{formData.bilirubin}</TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report[3]?.color }}
                    >
                      {renderColoredCircle(report[3]?.color)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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

              {report.map((item, index) => (
                <Typography
                  key={index}
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

export default LiverFunctionTestsPage;

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

