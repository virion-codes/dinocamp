import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './database/db.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

// Test DB connection on startup (table "users" from database/schema.sql)
async function testConnection() {
  try {
    const { rows } = await pool.query(
      'SELECT id, email, name, created_at FROM users LIMIT 1'
    );
    console.log('PostgreSQL connected (dinocamp.users). Rows:', rows.length);
  } catch (err) {
    console.error('PostgreSQL connection failed:', err.message);
    console.error('Check backend/.env (PGHOST, PGUSER, PGPASSWORD, PGDATABASE) and that database/schema.sql was run.');
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// List all users
app.get('/api/users', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, email, name, created_at FROM users ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('GET /api/users error:', err);
    res.status(500).json({
      error: 'Failed to fetch users',
      detail: process.env.NODE_ENV !== 'production' ? err?.message : undefined,
    });
  }
});

// Get one user
app.get('/api/users/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user (name and/or email)
app.put('/api/users/:id', async (req, res) => {
  const { name, email } = req.body;
  if (name == null && email == null) {
    return res.status(400).json({ error: 'Provide at least one of name or email' });
  }
  try {
    const updates = [];
    const values = [];
    let i = 1;
    if (name != null) {
      updates.push(`name = $${i++}`);
      values.push(name);
    }
    if (email != null) {
      updates.push(`email = $${i++}`);
      values.push(email);
    }
    values.push(req.params.id);
    const { rows } = await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${i} RETURNING id, email, name, created_at`,
      values
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  await testConnection();
});
