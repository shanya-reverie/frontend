import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
        try {
            const res = await axios.post(url, { username, password });
            if (isRegister) {
                toast.success('Registration successful');
            } else {
                localStorage.setItem('token', res.data.token);
                toast.success('Login successful');
            }
            navigate(`/welcome?username=${username}`);
        } catch (error) {
            toast.error(isRegister ? 'Registration failed' : 'Login failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {isRegister ? 'Register' : 'Login'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1, mb: 2 }}
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? 'Already have an account? Login' : 'New user? Register'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AuthForm;
