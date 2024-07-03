import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Welcome from './components/Welcome';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Header />
                <Box sx={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<AuthForm />} />
                        <Route path="/welcome" element={<Welcome />} />
                    </Routes>
                </Box>
                <Footer />
                <ToastContainer />
            </Box>
        </Router>
    );
}

export default App;
