import React, { useState } from "react";
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

const WHRCalculator = () => {
  const [formData, setFormData] = useState({
    waist: "",
    hip: "",
    gender: "male",
  });
  const [ratio, setRatio] = useState(null);
  const [ratioCategory, setRatioCategory] = useState("");
  
  // Separate error states for waist and hip
  const [waistError, setWaistError] = useState("");
  const [hipError, setHipError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset error messages when user starts typing
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

  const handleSubmit = (e) => {
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

    const ratioValue = (waist / hip).toFixed(2);
    setRatio(ratioValue);
    categorizeWHR(ratioValue);
  };

  const categorizeWHR = (ratio) => {
    let category = "";
    let implication = "";
    let adviceText = "";

    if (formData.gender === "female") {
        if (ratio < 0.80) {
            category = "Low Risk";
            implication = "You have a lower risk of heart disease and other health complications.";
            adviceText="Continue maintaining a healthy lifestyle with balanced diet and regular exercise."
        } else if (ratio >= 0.80 && ratio < 0.85) {
            category = "Moderate Risk";
            implication = "You have a moderate risk of developing conditions like cardiovascular disease and diabetes.";
            adviceText = "Incorporate moderate exercise and maintain a healthy, balanced diet to prevent further fat accumulation.";
        } else {
            category = "High Risk";
            implication = "You have a higher risk of developing obesity-related conditions including heart disease, type 2 diabetes and stroke.";
            adviceText = "Focus on weight loss through a structured diet and regular cardiovascular + resistance training. Seek medical advice.";
        }
    } else { // Male
      if (ratio < 0.90) {
        category = "Low Risk";
        implication = "You have a lower risk of heart disease and other health complications.";
        adviceText="Continue maintaining a healthy lifestyle with balanced diet and regular exercise."
    } else if (ratio >= 0.90 && ratio < 1.00) {
        category = "Moderate Risk";
        implication = "You have a moderate risk of developing conditions like cardiovascular disease and diabetes.";
        adviceText = "Incorporate moderate exercise and maintain a healthy, balanced diet to prevent further fat accumulation.";
    } else {
        category = "High Risk";
        implication = "You have a higher risk of developing obesity-related conditions, including heart disease, type 2 diabetes and stroke.";
        adviceText = "Focus on weight loss through a structured diet and regular cardiovascular + resistance training. Seek medical advice.";
    }
    }

    setRatioCategory(`${category} - ${implication} ${adviceText}`);
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
                error={!!waistError} // Show error state for waist input
                helperText={waistError} // Display waist error message
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
                error={!!hipError} // Show error state for hip input
                helperText={hipError} // Display hip error message
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
                arcsLength={[0.5, 0.5, 0.5]} // Adjusted arcsLength based on the new ranges
                colors={["#63bc46", "#fbec31", "#ee3928"]}
                percent={Math.min(ratio / (formData.gender === 'female' ? 0.85 : 0.90),1)}
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
                variant="h4"
                component="span"
                sx={{ color: "#034c81", fontSize: "36px", margin: "20px 0" }}
              >
                Your WHR Ratio: {ratio}
              </Typography>
              
              <Typography variant="h6" component="span">
                <br /> {ratioCategory}
              </Typography>
               
            </Box>
          </Card>
        )}
      </ContentContainer>
    </Container>
  );
};

export default WHRCalculator;