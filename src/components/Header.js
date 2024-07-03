import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div">
                    Translation Portal
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    color="inherit"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
