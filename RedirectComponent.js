import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

const urlMap = {
  'amf001': 'https://www.affordmed.com',
  'goog01': 'https://www.google.com',
};

const logRedirect = (shortcode, targetUrl) => {
  console.info(`[REDIRECT LOG] Shortcode: "${shortcode}", Target URL: "${targetUrl || 'Not Found'}"`);
};

function UrlRedirector() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const destination = urlMap[code];
    logRedirect(code, destination);

    if (destination) {
      window.location.replace(destination);
    } else {
      navigate('/', { state: { message: `Sorry! No URL found for code "${code}".` } });
    }
  }, [code, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Preparing to redirect...
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        We are taking you to your destination. If nothing happens, please check your URL.
      </Typography>
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    </Container>
  );
}

export default UrlRedirector;
