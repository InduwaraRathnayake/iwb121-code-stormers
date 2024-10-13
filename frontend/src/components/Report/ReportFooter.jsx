import React from 'react';
import { Typography } from '@mui/material';

const ReportFooter = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '0px', borderTop: '1px solid #ccc' }}>
      <Typography
            variant="body1"
            sx={{
              color: "#004c8c",
              fontSize: "16px",
              lineHeight: "1.5",
              margin: "20px",
            }}
          >
        We appreciate your trust in our services. If you have any questions or require further assistance, please do not hesitate to contact us.
   <br></br>
 
        Explore our comprehensive range of offerings:{" "}
        <a
          href="http://localhost:5173/services"
          style={{ color: "#004c8c", textDecoration: "underline", fontWeight: "bold" }}
        >
          View Our Services
        </a>
        </Typography>
    </footer>
  );
};

export default ReportFooter;
