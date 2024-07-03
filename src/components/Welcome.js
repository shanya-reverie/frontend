import React, { useState } from 'react';
import { Button, Typography, Container, Box, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const NMT_LANGUAGES = ["hindi", "gujarati", "marathi", "odia", "assamese", "bengali", "kannada", "telugu", "tamil", "malayalam", "punjabi", "english", "urdu", "bodo", "manipuri", "nepali", "dogri", "kashmiri", "konkani", "maithili", "sanskrit", "santali"];

const Welcome = () => {
    const [file, setFile] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState('');
    const [segments, setSegments] = useState([]);
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [translatedContent, setTranslatedContent] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSourceLanguageChange = (e) => {
        setSourceLanguage(e.target.value);
    };

    const handleTargetLanguageChange = (e) => {
        setTargetLanguage(e.target.value);
    };

    const handleFileUpload = async () => {
        if (!file || !targetLanguage) {
            toast.error('Please select a file and target language');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetLanguage', targetLanguage.toLowerCase());

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('File uploaded successfully');
            setSegments(response.data.segments);
            setTranslatedContent(response.data.translatedContent);
        } catch (error) {
            toast.error('File upload failed');
        }
    };

    const handleDownload = () => {
        if (!translatedContent) {
            toast.error('No content available for download');
            return;
        }

        const blob = new Blob([translatedContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'translated_segments.txt');
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 8,
                    marginX: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                }}
            >
                <Box sx={{ my: 4 }}>
                    <Box sx={{ display: "flex", gap: "20px", mb: 2 }} >
                        <FormControl sx={{ }}>
                            <InputLabel id="target-language-label">Source Language</InputLabel>
                            <Select
                                // labelId="target-language-label"
                                // id="target-language"
                                value={sourceLanguage}
                                label="Source Language"
                                onChange={handleSourceLanguageChange}
                                sx={{
                                    width: "200px"
                                }}
                            >
                                <MenuItem value="English">English</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="target-language-label">Target Language</InputLabel>
                            <Select
                                labelId="target-language-label"
                                id="target-language"
                                value={targetLanguage}
                                label="Target Language"
                                onChange={handleTargetLanguageChange}
                                sx={{
                                    width: "200px"
                                }}
                            >
                                {NMT_LANGUAGES.map((language, index) => (
                                    <MenuItem key={index} value={language}>{language}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="contained"
                            sx={{ ml: 2 }}
                            onClick={handleFileUpload}
                        >
                            Translate File
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ mt: 8 }}>
                    {segments.length > 0 && (
                        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                            {/* <Typography variant="h6" gutterBottom>Translation Results</Typography> */}
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h6" align="center">Original Text</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" align="center">Translated Text</Typography>
                                </Grid>
                                {segments.map((segment) => (
                                    <React.Fragment key={segment.id}>
                                        <Grid item xs={6}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="body1">{segment.originalText}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="body1">{segment.translatedText[0]}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Paper>
                    )}
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Welcome;

