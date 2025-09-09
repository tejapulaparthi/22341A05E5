import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import URLShortenerPage from './URLShortenerPage';
import URLStatisticsPage from './URLStatisticsPage';
import RedirectComponent from './RedirectComponent';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Button color="inherit" component={Link} to="/">
              Shorten URL
            </Button>
            <Button color="inherit" component={Link} to="/stats">
              View Stats
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<URLShortenerPage />} />
        <Route path="/stats" element={<URLStatisticsPage />} />
        <Route path="/:shortcode" element={<RedirectComponent />} />
      </Routes>
    </Router>
  );
}

export default App;