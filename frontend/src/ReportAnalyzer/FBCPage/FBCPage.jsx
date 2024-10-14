import { useState, useRef, useEffect } from "react";
import { TextField, Typography, Card, CardContent, Box } from "@mui/material";
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

const FBCPage = () => {
  const [formData, setFormData] = useState({
    whiteBloodCells: "",
    redBloodCells: "",
    platelets: "",
    hemoglobin: "",
  });

  const [report, setReport] = useState(null);
  const [error, setError] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const reportRef = useRef(null);

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
      whiteBloodCells: parseFloat(formData.whiteBloodCells),
      redBloodCells: parseFloat(formData.redBloodCells),
      platelets: parseFloat(formData.platelets),
      hemoglobin: parseFloat(formData.hemoglobin),
    };

    try {
      const response = await axios.post(
        "http://localhost:9090/api/analyzeFBC",
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
    whiteBloodCells: "4.0-11.0 x 10⁹/L",
    redBloodCells: "4.5-5.9 x 10¹²/L",
    hemoglobin: "13.8-17.2 g/L",
    platelets: "150-450 x 10⁹/L",
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
          Full Blood Count Report Analyzer
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
            name="whiteBloodCells"
            label="White Blood Cells (10^9/L)"
            value={formData.whiteBloodCells}
            onChange={handleChange}
            sx={{ marginBottom: "16px" }}
            error={!!error.whiteBloodCells}
            helperText={error.whiteBloodCells}
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
            sx={{ marginBottom: "16px" }}
            error={!!error.redBloodCells}
            helperText={error.redBloodCells}
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
            sx={{ marginBottom: "16px" }}
            error={!!error.hemoglobin}
            helperText={error.hemoglobin}
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
            sx={{ marginBottom: "16px" }}
            error={!!error.platelets}
            helperText={error.platelets}
          />
          <CardButton type="submit">Analyze</CardButton>
        </form>
      </FormContainer>
      <br />
      <br />
      {/* Report Card Section */}
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
              <ReportHeader
                fullName={fullName}
                userEmail={userEmail}
                currentDate={currentDate}
              />
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
              Analysis of Full Blood Count (FBC) Test Results
            </Typography>
            <ReportTable
              headers={["Test", "Expected Range", "Your Result", "Status"]}
              rows={[
                [
                  "White Blood Cells",
                  expectedRanges.whiteBloodCells,
                  `${formData.whiteBloodCells} x 10⁹/L`,
                  renderColoredCircle(report[0]?.color),
                ],
                [
                  "Red Blood Cells",
                  expectedRanges.redBloodCells,
                  `${formData.redBloodCells} x 10¹²/L`,
                  renderColoredCircle(report[1]?.color),
                ],
                [
                  "Hemoglobin",
                  expectedRanges.hemoglobin,
                  `${formData.hemoglobin} g/L`,
                  renderColoredCircle(report[2]?.color),
                ],
                [
                  "Platelets",
                  expectedRanges.platelets,
                  `${formData.platelets} x 10⁹/L`,
                  renderColoredCircle(report[3]?.color),
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

export default FBCPage;

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
