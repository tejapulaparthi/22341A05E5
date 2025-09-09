import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box,
} from '@mui/material';

// Mock statistics (simulate backend response)
const urlStatsData = [
  {
    original: 'https://www.urlshortner.com',
    shortened: 'http://localhost:3000/amd123',
    created: '2025-09-09 10:00 AM',
    expires: '2025-09-09 10:30 AM',
    clicks: 15,
    details: [
      { time: '10:05 AM', source: 'Direct', location: 'Hyderabad' },
      { time: '10:10 AM', source: 'Twitter', location: 'Bangalore' },
      { time: '10:15 AM', source: 'Facebook', location: 'Chennai' },
    ],
  },
  {
    original: 'https://www.google.com',
    shortened: 'http://localhost:3000/g00gle',
    created: '2025-09-08 09:00 AM',
    expires: '2025-09-08 09:30 AM',
    clicks: 22,
    details: [
      { time: '09:05 AM', source: 'Search', location: 'Delhi' },
      { time: '09:10 AM', source: 'Direct', location: 'Mumbai' },
    ],
  },
];

// Logging middleware example for statistics
const logStatsFetch = (stats) => {
  console.info('[STATS FETCHED]', stats.map(s => ({ original: s.original, clicks: s.clicks })));
};

function UrlStatistics() {
  // Log the stats on component mount
  React.useEffect(() => {
    logStatsFetch(urlStatsData);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Shortened URL Analytics
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table aria-label="URL statistics table">
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell align="right">Total Clicks</TableCell>
              <TableCell>Click Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urlStatsData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Link href={row.original} target="_blank" rel="noopener">{row.original}</Link>
                </TableCell>
                <TableCell>
                  <Link href={row.shortened} target="_blank" rel="noopener">{row.shortened}</Link>
                </TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.expires}</TableCell>
                <TableCell align="right">{row.clicks}</TableCell>
                <TableCell>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {row.details.map((click, i) => (
                      <li key={i}>
                        {click.time} | {click.source} | {click.location}
                      </li>
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UrlStatistics;
