// Custom logger middleware for React (no console.log)
// Logs actions and API calls to localStorage['appLogs']

export function logEvent(event) {
  const logs = JSON.parse(localStorage.getItem('appLogs') || '[]');
  logs.push({ ...event, timestamp: new Date().toISOString() });
  localStorage.setItem('appLogs', JSON.stringify(logs));
}

// Example usage: logEvent({ type: 'API_CALL', endpoint: '/shorturls', method: 'POST', status: 201 }) 