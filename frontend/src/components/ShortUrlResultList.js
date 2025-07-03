import React from 'react';
import { Box, Card, CardContent, Typography, Link, Grid, Divider } from '@mui/material';

// Unique, modern result list for shortened URLs
export default function ShortUrlResultList({ results }) {
  if (!results.length) return null;
  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={700} color="primary.main">Shortened URLs</Typography>
      <Grid container spacing={2} mt={1}>
        {results.map((res, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Original URL:</Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-all', mb: 1 }}>{res.url}</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">Short Link:</Typography>
                <Link href={res.shortLink} target="_blank" rel="noopener" underline="hover" sx={{ fontWeight: 600 }}>
                  {res.shortLink}
                </Link>
                <Typography variant="body2" mt={1} color="text.secondary">
                  Expiry: {new Date(res.expiry).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 