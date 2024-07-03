import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                py: 2,
                textAlign: 'center',
                mt: 'auto',
                // color: 'primary.main',
                backgroundColor: 'primary.contrastText',
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Translation Portal. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
