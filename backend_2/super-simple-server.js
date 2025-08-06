const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/api/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      message: 'Simple server is working!',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Server is running!' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:3001`);
});

