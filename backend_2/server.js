const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // Changed to a different port

// Middleware
app.use(cors());
app.use(express.json());

// Simple test routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Health check successful',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Minimal server running on http://localhost:${PORT}`);
  console.log(`🔗 Test at: http://localhost:${PORT}/api/health`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.log('Try: lsof -ti:3001 | xargs kill -9');
  } else if (err.code === 'EACCES') {
    console.error(`❌ Permission denied for port ${PORT}`);
    console.log('Try a port above 1024');
  } else {
    console.error('❌ Server error:', err);
  }
});