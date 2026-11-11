const express = require('express');
const webhookRoutes = require('./routes/webhook');

const app = express();

app.use(express.json({ limit: '100kb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/webhook', webhookRoutes);

// Keep malformed JSON errors predictable for webhook clients.
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }

  console.error('Unhandled request error:', error);
  return res.status(500).json({ error: 'An unexpected error occurred.' });
});

module.exports = app;
