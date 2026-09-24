const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const { initDatabase, getPool } = require('./config/db');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'pbcms-apex-industries-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize DB and start server
async function start() {
  try {
    await initDatabase();
    const pool = getPool();

    // Run schema
    const schema = fs.readFileSync(path.join(__dirname, 'sql', 'schema.sql'), 'utf8');
    const statements = schema.split(';').filter(s => s.trim());
    for (const stmt of statements) {
      if (stmt.trim()) await pool.query(stmt);
    }

    // Run seed (ignore duplicate errors)
    try {
      const seed = fs.readFileSync(path.join(__dirname, 'sql', 'seed.sql'), 'utf8');
      const seedStmts = seed.split(';').filter(s => s.trim());
      for (const stmt of seedStmts) {
        if (stmt.trim()) {
          try { await pool.query(stmt); } catch(e) { /* ignore duplicates */ }
        }
      }
    } catch(e) { console.log('Seed note:', e.message); }

    // Hash passwords for seed users if they have placeholder hashes
    const bcrypt = require('bcryptjs');
    const [users] = await pool.query('SELECT id, password_hash FROM users');
    for (const u of users) {
      // If the hash doesn't verify against 'password123', re-hash it
      const valid = await bcrypt.compare('password123', u.password_hash).catch(() => false);
      if (!valid) {
        const hash = await bcrypt.hash('password123', 10);
        await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, u.id]);
      }
    }

    console.log('✅ Database initialized with schema + seed data');

    // Mount routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/dashboard', require('./routes/dashboard'));
    app.use('/api/company', require('./routes/company'));
    app.use('/api/departments', require('./routes/departments'));
    app.use('/api/employees', require('./routes/employees'));
    app.use('/api/products', require('./routes/products'));
    app.use('/api/inventory', require('./routes/inventory'));
    app.use('/api/orders', require('./routes/orders'));
    app.use('/api/buyers', require('./routes/buyers'));
    app.use('/api/vehicles', require('./routes/vehicles'));
    app.use('/api/legal', require('./routes/legal'));

    // SPA fallback
    app.get('/dashboard', (req, res) => {
      if (!req.session.user) return res.redirect('/');
      res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    });
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'login.html'));
    });

    app.listen(PORT, () => {
      console.log(`\n🚀 PBCMS running at http://localhost:${PORT}\n`);
      console.log('📋 Login accounts (password: password123):');
      console.log('   admin / hr_manager / prod_head / inv_manager');
      console.log('   fin_head / legal_head / log_manager / buyer_user / share_user\n');
    });
  } catch (err) {
    console.error('❌ Failed to start:', err.message);
    process.exit(1);
  }
}

start();
