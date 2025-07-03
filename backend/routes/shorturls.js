const express = require('express');
const { urls } = require('../storage');
const { generateShortcode, isValidShortcode } = require('../utils/shortcode');

const router = express.Router();

// Helper: Validate URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// POST /shorturls - Create short URL
router.post('/', (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL.' });
  }
  let code = shortcode;
  if (code) {
    if (!isValidShortcode(code)) {
      return res.status(400).json({ error: 'Invalid shortcode format.' });
    }
    if (urls.has(code)) {
      return res.status(409).json({ error: 'Shortcode already in use.' });
    }
  } else {
    // Generate unique shortcode
    let tries = 0;
    do {
      code = generateShortcode();
      tries++;
    } while (urls.has(code) && tries < 5);
    if (urls.has(code)) {
      return res.status(500).json({ error: 'Failed to generate unique shortcode.' });
    }
  }
  const now = new Date();
  const validMins = Number.isInteger(validity) ? validity : 30;
  const expiry = new Date(now.getTime() + validMins * 60000);
  urls.set(code, {
    url,
    createdAt: now,
    expiry,
    clicks: [],
  });
  return res.status(201).json({
    shortLink: `${req.protocol}://${req.get('host')}/${code}`,
    expiry: expiry.toISOString(),
  });
});

// GET /shorturls/:shortcode - Get stats
router.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const entry = urls.get(shortcode);
  if (!entry) {
    return res.status(404).json({ error: 'Shortcode not found.' });
  }
  const { url, createdAt, expiry, clicks } = entry;
  return res.json({
    url,
    createdAt,
    expiry,
    totalClicks: clicks.length,
    clicks: clicks.map(c => ({ timestamp: c.timestamp, source: c.source, geo: c.geo })),
  });
});

module.exports = router; 