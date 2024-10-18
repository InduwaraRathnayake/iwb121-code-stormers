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
import bmiImage from "../../assets/bmi.jpg";
import { ContentContainer, TitleBox, CardButton } from "../../components/Card";
import GaugeChart from "react-gauge-chart";
import axios from "axios";

export default function BMICalculator() {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    gender: "male",
  });
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");

  const reportRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "height") {
      setHeightError("");
    } else if (name === "weight") {
      setWeightError("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { height, weight } = formData;
    let valid = true; 

    if (!height || isNaN(height) || height <= 0) {
      setHeightError("Please enter a valid positive number for height."); 
      valid = false; 
    }

    if (!weight || isNaN(weight) || weight <= 0) {
      setWeightError("Please enter a valid positive number for weight.");
      valid = false; 
    }

    if (!valid) return; 

    try {
      const response = await axios.post("http://localhost:9090/api/calculateBMI", {
        height: parseFloat(height),
        weight: parseFloat(weight),
      });

      setBmi(response.data.bmi.toFixed(2));
      setBmiCategory(response.data.category);

      if (reportRef.current) {
        reportRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error calculating BMI:", error);
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
            BMI Calculator
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
                name="height"
                label="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                error={!!heightError} 
                helperText={heightError} 
                sx={{ marginBottom: "16px" }}
                type="text" 
              />
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                name="weight"
                label="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                error={!!weightError} 
                helperText={weightError} 
                sx={{ marginBottom: "16px" }}
                type="text" 
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
              <CardButton type="submit">Calculate BMI</CardButton>
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
              src={bmiImage}
              alt="BMI Info"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
        {bmi && (
          <Card
            ref={reportRef} 
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
                nrOfLevels={5}
                arcsLength={[0.136, 0.176, 0.076, 0.196, 0.4]}
                colors={["#60ccf3", "#63bc46", "#fbec31", "#f78f2c", "#ee3928"]}
                percent={(bmi - 15) / 25}
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
                Your BMI: {bmi}
              </Typography>
              <Typography variant="h6" component="span">
                <br /> {bmiCategory}
              </Typography>
            </Box>
          </Card>
        )}
      </ContentContainer>
    </Container>
  );
}