const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../request.log');

function logger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logEntry = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${duration}ms\n`;
    fs.appendFile(logFilePath, logEntry, err => {
      // Silently fail if logging fails (no console.log allowed)
    });
  });
  next();
}

module.exports = logger; 