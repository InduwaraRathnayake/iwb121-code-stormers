import React from 'react';
import { Container, Box, Typography, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import faqImage from '../../assets/faq-image.jpg'; // Update the path to your image

const FAQSection = () => {
  return (
    <Container maxWidth="md"> {/* Set maxWidth to 'md' for a narrower layout */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card
          sx={{
            maxWidth: '90%',
            boxShadow: 10,
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly more opaque background
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 900,
                fontSize: '30px',
                color: '#034c81',
                textAlign: 'center',
                marginBottom: '20px', // Reduced margin
              }}
            >
              Frequently Asked Questions
            </Typography>

            {/* Center Image */}
            <Box display="flex" justifyContent="center" mb={4}>
              <img src={faqImage} alt="Center Image" style={{ maxWidth: '250px', height: 'auto', borderRadius: '10px' }} />
            </Box>

            {/* FAQ Items */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}> {/* Align items center and add gap */}
              {faqData.map((item, index) => (
                <Card key={index} sx={{ borderRadius: '15px', width: '100%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index + 1}a-content`}
                      id={`panel${index + 1}a-header`}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#034c81' }}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: '#333', lineHeight: 1.5 }}>
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

// FAQ Data
const faqData = [
  {
    question: "What does my blood report indicate?",
    answer: "Your blood report provides insights into various health markers, such as cholesterol levels, blood sugar, and more. Analyzing these values can help identify potential health issues."
  },
  {
    question: "How do I calculate my BMI?",
    answer: "BMI (Body Mass Index) is calculated using your height and weight. You can enter your values in our BMI calculator to get your BMI and understand your weight category."
  },
  {
    question: "Why is waist-to-hip ratio important?",
    answer: "Waist-to-hip ratio helps assess body fat distribution and is an important indicator of health risks associated with obesity. A higher ratio may indicate a greater risk of cardiovascular diseases."
  },
  {
    question: "How often should I analyze my blood report?",
    answer: "It is advisable to check your blood report annually or as recommended by your healthcare provider, especially if you have existing health conditions."
  },
  {
    question: "What can I do to improve my BMI?",
    answer: "Maintaining a balanced diet and regular exercise are effective ways to manage your BMI. Consult with a healthcare professional for personalized advice."
  },
  {
    question: "What are the common blood tests included in a blood report?",
    answer: "Common blood tests include Complete Blood Count (CBC), lipid panel, liver function tests, blood glucose test, and thyroid function tests, which help assess overall health."
  },
  
];

export default FAQSection;
