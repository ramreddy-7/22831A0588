import { logEvent } from '../middleware/logger';

const API_BASE = 'http://localhost:5000';

export async function createShortUrl({ url, validity, shortcode }) {
  try {
    const res = await fetch(`${API_BASE}/shorturls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, validity, shortcode }),
    });
    const data = await res.json();
    logEvent({ type: 'API_CALL', endpoint: '/shorturls', method: 'POST', status: res.status });
    if (!res.ok) throw new Error(data.error || 'Failed to create short URL');
    return data;
  } catch (err) {
    logEvent({ type: 'API_ERROR', endpoint: '/shorturls', method: 'POST', error: err.message });
    throw err;
  }
}

export async function getShortUrlStats(shortcode) {
  try {
    const res = await fetch(`${API_BASE}/shorturls/${shortcode}`);
    const data = await res.json();
    logEvent({ type: 'API_CALL', endpoint: `/shorturls/${shortcode}`, method: 'GET', status: res.status });
    if (!res.ok) throw new Error(data.error || 'Failed to fetch stats');
    return data;
  } catch (err) {
    logEvent({ type: 'API_ERROR', endpoint: `/shorturls/${shortcode}`, method: 'GET', error: err.message });
    throw err;
  }
} 