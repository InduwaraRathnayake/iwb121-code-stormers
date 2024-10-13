import React from 'react';
import { Typography } from '@mui/material';
import HospitalLogo from '../../assets/logo.png';

const ReportHeader = ({ fullName, userEmail, currentDate }) => {
  return (
    <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  marginTop: "20px",
                  marginLeft: "20px",
                }}
              >
                <img
                  src={HospitalLogo}
                  alt="Hospital Logo"
                  style={{ width: "100px" }}
                />
                <div style={{ textAlign: "right", marginLeft: "40px" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    WELLNESS 360
                  </Typography>
                  <Typography variant="body2">wellness360@gmail.com</Typography>
                  <Typography variant="body2">
                    University of Moratuwa
                  </Typography>
                  <Typography variant="body2">Phone: +94 123456789</Typography>
                </div>

                <div style={{ textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginLeft: "220px" }}
                  >
                    Patient Information
                  </Typography>
                  <Typography variant="body1">Name: {fullName}</Typography>
                  <Typography variant="body1">Email: {userEmail}</Typography>
                  <Typography variant="body1">Date: {currentDate}</Typography>
                </div>
              </div>
  );
};

export default ReportHeader;
