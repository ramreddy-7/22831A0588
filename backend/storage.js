// In-memory storage for URLs and click stats
const urls = new Map(); // shortcode -> { url, createdAt, expiry, clicks: [] }

module.exports = {
  urls,
};
