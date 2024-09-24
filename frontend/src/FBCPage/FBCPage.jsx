import React from 'react';
import { Typography, Box } from '@mui/material';

const FBCPage = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Full Blood Count (FBC)</Typography>
            <Typography variant="body1">
                A complete blood count is a test that evaluates overall health and detects a variety of disorders.
            </Typography>
            {/* Add more details about FBC here */}
        </Box>
    );
};

export default FBCPage;
