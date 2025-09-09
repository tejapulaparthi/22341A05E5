import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

// Mock API call simulating backend
const simulateUrlCreation = async (url, expiryMinutes, customCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic URL validation
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        reject(new Error('URL must start with http:// or https://'));
        return;
      }

      // Validate expiry
      const expiry = parseInt(expiryMinutes, 10);
      if (expiryMinutes && (isNaN(expiry) || expiry <= 0)) {
        reject(new Error('Validity must be a positive number (minutes)'));
        return;
      }

      // Generate shortcode if not provided
      const code = customCode || Math.random().toString(36).slice(2, 8);
      const shortenedUrl = `http://localhost:3000/${code}`;
      const expiryDate = new Date(Date.now() + (expiry || 30) * 60000).toLocaleString();

      // Logging middleware call
      logUrlCreation(url, shortenedUrl, expiryDate, code);

      resolve({
        originalUrl: url,
        shortenedUrl,
        expiryDate,
        shortcode: code,
        clicks: 0,
        clickDetails: [],
      });
    }, 1000); // Simulated delay
  });
};

// Logging middleware example
const logUrlCreation = (original, shortUrl, expiry, code) => {
  console.info('[URL CREATED]', { original, shortUrl, expiry, code });
};

function UrlShortener() {
  const [urlInput, setUrlInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [validityInput, setValidityInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const data = await simulateUrlCreation(urlInput, validityInput, codeInput);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Quick URL Shortener
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          Enter any URL to generate a shortened link. Optionally, provide a custom code and expiry time.
        </Typography>

        <Box component="form" onSubmit={handleShorten} sx={{ width: '100%', maxWidth: 600 }}>
          <TextField
            fullWidth
            required
            label="Enter Original URL"
            margin="normal"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <TextField
            fullWidth
            label="Custom Shortcode (Optional)"
            margin="normal"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            inputProps={{ pattern: '^[a-zA-Z0-9]+$' }}
          />
          <TextField
            fullWidth
            label="Validity (minutes, optional, default 30)"
            margin="normal"
            type="number"
            value={validityInput}
            onChange={(e) => setValidityInput(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Short URL'}
          </Button>

          {result && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body1">
                Original URL: {result.originalUrl}
              </Typography>
              <Typography variant="body1">
                Shortened URL: <a href={result.shortenedUrl}>{result.shortenedUrl}</a>
              </Typography>
              <Typography variant="body1">
                Expires at: {result.expiryDate}
              </Typography>
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default UrlShortener;
