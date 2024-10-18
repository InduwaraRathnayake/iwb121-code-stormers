import { Box, Typography, Container } from "@mui/material";
import WHRCard from "../banners/WHR-banner";
import BmiBannerCard from "../banners/bmi-banner";

const  Calculator = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: "3rem",
            color: "#034c81",
            fontWeight: "bold",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
            Evaluate Your Health
        </Typography>
      </Box>
      <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop={-10}
        minHeight="100vh"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }} 
      >
        <Box sx={{ flex: 1, mr: { xs: 0, md: 2 } }}>
          <WHRCard /> {/* WHR card on the left */}
        </Box>
        <Box sx={{ flex: 1, ml: { xs: 0, md: 2 } }}>
          <BmiBannerCard /> {/* BMI card on the right */}
        </Box>
      </Box>
    </Container>
    </div>
  );
};

export  default Calculator;