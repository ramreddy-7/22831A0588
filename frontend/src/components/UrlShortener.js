import React, { useState } from 'react';
import { Box, Typography, Alert, Card, CardContent, Divider, Snackbar } from '@mui/material';
import UrlInputList from './UrlInputList';
import ShortUrlResultList from './ShortUrlResultList';
import { createShortUrl } from '../api/shortener';

// Unique, modern URL Shortener component using Material UI
export default function UrlShortener() {
  const [results, setResults] = useState(() => {
    return JSON.parse(sessionStorage.getItem('shortResults') || '[]');
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle URL submission and show feedback
  const handleSubmit = async (inputs) => {
    setError('');
    setSuccess(false);
    const newResults = [];
    for (let input of inputs) {
      try {
        const res = await createShortUrl({
          url: input.url,
          validity: input.validity ? Number(input.validity) : undefined,
          shortcode: input.shortcode || undefined,
        });
        newResults.push({ ...res, url: input.url });
      } catch (err) {
        setError(err.message);
      }
    }
    if (newResults.length) {
      const allResults = [...newResults, ...results];
      setResults(allResults);
      sessionStorage.setItem('shortResults', JSON.stringify(allResults));
      setSuccess(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Card elevation={6} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight={700} color="primary.main">
            Shorten Your URLs
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <UrlInputList onSubmit={handleSubmit} />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </CardContent>
      </Card>
      <ShortUrlResultList results={results} />
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="URL(s) shortened successfully!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
} 