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
} from "@mui/material";
import {
  ContentContainer,
  TitleBox,
  FormContainer,
  CardButton,
} from "../../components/Card";
import axios from "axios";
import HospitalLogo from "../../assets/logo.png"; // Assuming you have a logo image in this path
import generatePDF from "../../helpers/generatePDF";

const FBCPage = () => {
  const [formData, setFormData] = useState({
    whiteBloodCells: "",
    redBloodCells: "",
    platelets: "",
    hemoglobin: "",
  });

  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState({}); // Object to track errors for each field
  const reportRef = useRef(null); // Reference for the report card

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^\d*\.?\d*$/; // regex to allow only numbers and decimal points

    // Only update state if the input value is valid according to the regex
    if (regex.test(value) || value === "") {
      setFormData({
        ...formData,
        [name]: value,
      });
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear error for this field on valid input
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} must be a valid number.`, // Set error for this field
      }));
    }
  };

  const validateInput = () => {
    const newErrors = {}; // Create a new error object
    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === "") {
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
      hemoglobin: parseFloat(formData.hemoglobin),
    };

    try {
      // Send the requestData object to the backend using axios
      const response = await axios.post(
        "http://localhost:9090/api/analyzeFBC",
        requestData
      );
      console.log("🚀 ~ handleSubmit ~ response:", response);

      // Assuming you receive a JSON response with interpretations from the backend
      const interpretations = response.data.map((item) => ({
        test: item.test,
        expectedRange: item.expectedRange,
        result: item.result,
        text: item.text,
        color: item.color,
      }));

      setReport(interpretations);
      setError({}); // Clear any previous errors
    } catch (error) {
      console.error("Error submitting data to the backend:", error);
      setError({ general: "Failed to send data to the backend." }); // Set general error
    }
  };

  const saveToHistory = () => {
    if (!validateInput()) {
      return; // Prevent saving if validation fails
    }

    setHistory([...history, formData]);
    alert("Report details saved successfully!");
  };

  // Scroll to the report card when the report is updated
  useEffect(() => {
    if (report && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [report]);

  const currentDate = new Date().toLocaleDateString(); // Get the current date

  // Expected ranges for FBC tests
  const expectedRanges = {
    whiteBloodCells: "4.0-11.0 × 10⁹/L",
    redBloodCells: "4.5-5.9 × 10¹²/L",
    hemoglobin: "130-180 g/L",
    platelets: "150-450 × 10⁹/L",
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
            sx={{ marginBottom: "16px" }}
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
            sx={{ marginBottom: "16px" }}
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
            sx={{ marginBottom: "16px" }}
            error={!!error.platelets} // Show error state if this field has an error
            helperText={error.platelets} // Show error message for this field
          />
          <CardButton type="submit">Analyze</CardButton>
        </form>
      </FormContainer>

      {/* Report Card Section */}
      {report && (
        <Card
          ref={reportRef} // Reference to the report card
          sx={{
            marginTop: "40px",
            padding: "20px",
            border: "1px solid #004c8c",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "800px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Added shadow for depth
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
              }}
            >
              <img
                src={HospitalLogo}
                alt="Hospital Logo"
                style={{ width: "100px" }}
              />
              <div style={{ textAlign: "right" }}>
                <Typography variant="body1">Username</Typography>
                <Typography variant="body1">{currentDate}</Typography>
              </div>
            </div>
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
                      White Blood Cells
                    </TableCell>
                    <TableCell align="right">
                      {expectedRanges.whiteBloodCells}
                    </TableCell>
                    <TableCell align="right">
                      {formData.whiteBloodCells} × 10⁹/L{" "}
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
                      Red Blood Cells
                    </TableCell>
                    <TableCell align="right">
                      {expectedRanges.redBloodCells}
                    </TableCell>
                    <TableCell align="right">
                      {formData.redBloodCells} × 10¹²/L
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
                      Hemoglobin
                    </TableCell>
                    <TableCell align="right">
                      {expectedRanges.hemoglobin}
                    </TableCell>
                    <TableCell align="right">
                      {formData.hemoglobin} g/L
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ color: report[2]?.color }}
                    >
                      {renderColoredCircle(report[2]?.color)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Platelets
                    </TableCell>
                    <TableCell align="right">
                      {expectedRanges.platelets}
                    </TableCell>
                    <TableCell align="right">
                      {formData.platelets} × 10⁹/L
                    </TableCell>
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
            <Typography
              variant="body1"
              sx={{ marginTop: "20px", fontWeight: "bold", color: "#004c8c" }}
            >
              Summary of Analysis:
            </Typography>
            {report.map((item, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ color: item.color }}
              >
                {item.text}
              </Typography>
            ))}
          </CardContent>

          <Typography
            variant="body1"
            sx={{
              marginTop: "25px",
              color: "#004c8c",
              fontSize: "16px",
              lineHeight: "1.5",
              textAlign: "center",
            }}
          >
            Thank you for using our service. Please contact us for more
            information or visit our website for other services.{" "}
            <a
              href="http://localhost:5173/services"
              style={{ color: "#004c8c", textDecoration: "underline" }}
            >
              other services
            </a>.
          </Typography>
        </Card>
      )}

      {/* PDF Generation Button */}
      {report && (
        <div style={{ textAlign: "center" }}>
          <CardButton onClick={getPDF} type="button">
            Download PDF
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
