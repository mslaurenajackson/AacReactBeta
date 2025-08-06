import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import process from 'process';

//ES6 module support
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup
const dbPath = process.env.DB_PATH || './aac_app.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database:', dbPath);
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      first_name TEXT,
      last_name TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Chat sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS chat_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE NOT NULL,
      user_uuid TEXT NOT NULL,
      title TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_uuid) REFERENCES users (uuid)
    )
  `);

  // Chat messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE NOT NULL,
      session_uuid TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_uuid) REFERENCES chat_sessions (uuid)
    )
  `);

  // AAC symbols/buttons table
  db.run(`
    CREATE TABLE IF NOT EXISTS aac_symbols (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE NOT NULL,
      user_uuid TEXT NOT NULL,
      category TEXT,
      symbol_text TEXT NOT NULL,
      image_url TEXT,
      audio_url TEXT,
      position_x INTEGER,
      position_y INTEGER,
      color TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_uuid) REFERENCES users (uuid)
    )
  `);

  console.log('Database tables initialized successfully');
}

// JWT middleware for protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (row) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const userUuid = uuidv4();

      db.run(
        'INSERT INTO users (uuid, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)',
        [userUuid, email, hashedPassword, firstName, lastName],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to create user' });
          }

          const token = jwt.sign(
            { uuid: userUuid, email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );

          res.status(201).json({
            message: 'User created successfully',
            token,
            user: { uuid: userUuid, email, firstName, lastName }
          });
        }
      );
    });
  } catch (error) {
    console.error('⛔ ERROR:', error.message, error.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// User login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { uuid: user.uuid, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          uuid: user.uuid,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        }
      });
    });
  } catch (error) {
    console.error('⛔ ERROR:', error.message, error.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile (protected)
app.get('/api/user/profile', authenticateToken, (req, res) => {
  db.get('SELECT uuid, email, first_name, last_name, role FROM users WHERE uuid = ?', 
    [req.user.uuid], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

// Chat endpoints
app.get('/api/chat/sessions', authenticateToken, (req, res) => {
  db.all('SELECT * FROM chat_sessions WHERE user_uuid = ? ORDER BY updated_at DESC', 
    [req.user.uuid], (err, sessions) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(sessions);
  });
});

app.post('/api/chat/sessions', authenticateToken, (req, res) => {
  const { title } = req.body;
  const sessionUuid = uuidv4();

  db.run('INSERT INTO chat_sessions (uuid, user_uuid, title) VALUES (?, ?, ?)',
    [sessionUuid, req.user.uuid, title || 'New Chat'], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create chat session' });
    }
    res.status(201).json({ uuid: sessionUuid, title: title || 'New Chat' });
  });
});

// AAC symbols endpoints
app.get('/api/aac/symbols', authenticateToken, (req, res) => {
  db.all('SELECT * FROM aac_symbols WHERE user_uuid = ? ORDER BY category, symbol_text', 
    [req.user.uuid], (err, symbols) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(symbols);
  });
});

app.post('/api/aac/symbols', authenticateToken, (req, res) => {
  const { category, symbolText, imageUrl, audioUrl, color } = req.body;
  const symbolUuid = uuidv4();

  db.run(
    'INSERT INTO aac_symbols (uuid, user_uuid, category, symbol_text, image_url, audio_url, color) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [symbolUuid, req.user.uuid, category, symbolText, imageUrl, audioUrl, color],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create symbol' });
      }
      res.status(201).json({ uuid: symbolUuid, message: 'Symbol created successfully' });
    }
  );
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});