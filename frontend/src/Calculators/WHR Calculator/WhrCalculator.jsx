import { useState, useRef } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
} from "@mui/material";
import whrImage from "../../assets/whr.jpg";
import { ContentContainer, TitleBox, CardButton } from "../../components/Card";
import GaugeChart from "react-gauge-chart";
import axios from "axios";

const WHRCalculator = () => {
  const [formData, setFormData] = useState({
    waist: "",
    hip: "",
    gender: "male",
  });
  const [ratio, setRatio] = useState(null);
  const [ratioCategory, setRatioCategory] = useState("");

  const [waistError, setWaistError] = useState("");
  const [hipError, setHipError] = useState("");

  const reportRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "waist") {
      setWaistError("");
    } else if (name === "hip") {
      setHipError("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before calculating
    const { waist, hip } = formData;
    let valid = true; // Flag to check if inputs are valid

    if (!waist || isNaN(waist)) {
      setWaistError("Please enter a valid number."); // Set waist error message
      valid = false; // Mark as invalid
    }

    if (!hip || isNaN(hip)) {
      setHipError("Please enter a valid number."); // Set hip error message
      valid = false; // Mark as invalid
    }

    if (!valid) return; // Prevent submission if inputs are invalid

    try {
      const response = await axios.post("http://localhost:9090/api/calculateWHR", {
        waist: parseFloat(waist),
        hip: parseFloat(hip),
        gender: formData.gender,
      });

      setRatio(response.data.ratio.toFixed(2));
      setRatioCategory(response.data.category);

      // Scroll to report card after form submission
      if (reportRef.current) {
        reportRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error calculating WHR:", error);
    }
  };

  const getGaugePercent = () => {
    if (formData.gender === "female") {
      if (ratio < 0.80) return 0.2;
      if (ratio >= 0.80 && ratio < 0.85) return 0.5;
      return 0.9;
    } else {
      if (ratio < 0.90) return 0.2;
      if (ratio >= 0.90 && ratio < 1.00) return 0.5;
      return 0.9;
    }
  };

  return (
    <Container>
      <ContentContainer>
        <TitleBox>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: "50px",
              color: "#034c81",
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Waist to Hip Ratio Calculator
          </Typography>
        </TitleBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
            mb: 5,
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 3,
            height: "450px",
            overflow: "hidden",
          }}
        >
          <Box sx={{ flex: "1 1 50%", p: 3 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                name="waist"
                label="Waist Measurement (cm)"
                value={formData.waist}
                onChange={handleChange}
                error={!!waistError}
                helperText={waistError}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                name="hip"
                label="Hip Measurement (cm)"
                value={formData.hip}
                onChange={handleChange}
                error={!!hipError}
                helperText={hipError}
                sx={{ marginBottom: "16px" }}
              />
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                row
                sx={{ marginTop: "10px" }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              <CardButton type="submit">Calculate WHR</CardButton>
            </form>
          </Box>
          <Box
            sx={{
              flex: "1 1 50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={whrImage}
              alt="WHR Info"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
        {ratio && (
          <Card
            ref={reportRef} // Add the ref to the report card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "30px auto",
              maxWidth: 800,
              padding: "30px",
              borderRadius: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 20px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                padding: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={3}
                arcsLength={[0.5, 0.3, 0.2]}
                colors={["#63bc46", "#fbec31", "#ee3928"]}
                percent={getGaugePercent()}
                arcPadding={0.02}
                textColor="#000000"
              />
            </Box>
            <Box
              sx={{
                marginLeft: { xs: 0, md: "30px" },
                marginTop: { xs: "20px", md: 0 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: 700, marginBottom: "20px" }}
              >
                Your WHR: {ratio}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, marginBottom: "10px" }}
              >
                <strong>{ratioCategory}</strong>
              </Typography>
            </Box>
          </Card>
        )}
      </ContentContainer>
    </Container>
  );
};

export default WHRCalculator;