import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Divider } from '@mui/material';
import { getShortUrlStats } from '../api/shortener';

// Unique, modern statistics component for shortened URLs
export default function UrlStats() {
  const [urls, setUrls] = useState(() => JSON.parse(sessionStorage.getItem('shortResults') || '[]'));
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const newStats = {};
      for (let u of urls) {
        try {
          newStats[u.shortLink] = await getShortUrlStats(u.shortLink.split('/').pop());
        } catch (e) {
          newStats[u.shortLink] = { error: e.message };
        }
      }
      setStats(newStats);
      setLoading(false);
    }
    if (urls.length) fetchStats();
  }, [urls]);

  if (!urls.length) return <Typography sx={{ mt: 4 }}>No URLs created in this session.</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={700} color="primary.main">Shortened URL Statistics</Typography>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      <Grid container spacing={2} mt={1}>
        {urls.map((u, idx) => {
          const stat = stats[u.shortLink];
          return (
            <Grid item xs={12} md={6} key={idx}>
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">Short Link:</Typography>
                  <Link href={u.shortLink} target="_blank" rel="noopener" underline="hover" sx={{ fontWeight: 600 }}>
                    {u.shortLink}
                  </Link>
                  <Typography variant="body2">Original: {u.url}</Typography>
                  <Divider sx={{ my: 1 }} />
                  {stat ? stat.error ? (
                    <Typography color="error">{stat.error}</Typography>
                  ) : (
                    <>
                      <Typography variant="body2">Created: {new Date(stat.createdAt).toLocaleString()}</Typography>
                      <Typography variant="body2">Expiry: {new Date(stat.expiry).toLocaleString()}</Typography>
                      <Typography variant="body2">Clicks: {stat.totalClicks}</Typography>
                      {stat.clicks && stat.clicks.length > 0 && (
                        <TableContainer component={Paper} sx={{ mt: 1, borderRadius: 2 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Timestamp</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Source</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Geo</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {stat.clicks.map((c, i) => (
                                <TableRow key={i}>
                                  <TableCell>{new Date(c.timestamp).toLocaleString()}</TableCell>
                                  <TableCell>{c.source}</TableCell>
                                  <TableCell>{c.geo}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </>
                  ) : <Typography>Loading...</Typography>}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
} 