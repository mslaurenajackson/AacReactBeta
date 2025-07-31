import express from 'express';
import cors from 'cors'; app.use(cors());
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const apiKey = import.meta.env.VITE_OPENSYMBOLS_API_KEY;

const SECRET = apiKey.split(':')[3]; // Extract the secret from the API key

app.get('/api/symbols/token', async (req, res) => {
  try {
    const response = await fetch('https://www.opensymbols.org/api/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: SECRET })
    });
    const json = await response.json();
    res.json({ access_token: json.access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'token generation failed' });
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));

//I used pieces of what we used for the Shrink app plus the Open Symbols's API instructions page to create this server file.