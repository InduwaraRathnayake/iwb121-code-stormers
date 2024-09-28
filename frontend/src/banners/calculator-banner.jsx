import { Container, Box } from '@mui/material';
import BmiBannerCard from './bmi-banner'; // Importing the existing BMI card
import WHRCard from './WHR-banner'; // Importing the existing WHR card

const CalculatorsCard = () => {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop={-10}
        minHeight="100vh"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }} // Stack vertically on small screens
      >
        <Box sx={{ flex: 1, mr: { xs: 0, md: 2 } }}>
          <WHRCard /> {/* WHR card on the left */}
        </Box>
        <Box sx={{ flex: 1, ml: { xs: 0, md: 2 } }}>
          <BmiBannerCard /> {/* BMI card on the right */}
        </Box>
      </Box>
    </Container>
  );
};

export default CalculatorsCard;
