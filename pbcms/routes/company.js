const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');

router.get('/', async (req, res) => {
  try { const [rows] = await getPool().query('SELECT * FROM company LIMIT 1'); res.json(rows[0] || {}); } catch(e) { res.status(500).json({error:e.message}); }
});
router.put('/', async (req, res) => {
  try { const { name, type, registration_no, headquarters, established_year } = req.body; await getPool().query('UPDATE company SET name=?, type=?, registration_no=?, headquarters=?, established_year=? WHERE company_id=1', [name,type,registration_no,headquarters,established_year]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }
});
router.get('/shareholders', async (req, res) => {
  try { const [rows] = await getPool().query('SELECT s.*, o.percentage_owned, o.share_type FROM shareholder s LEFT JOIN owns o ON s.shareholder_id = o.shareholder_id'); res.json(rows); } catch(e) { res.status(500).json({error:e.message}); }
});
router.post('/shareholders', async (req, res) => {
  try { const { shareholder_id, name, type, contact, percentage_owned, share_type } = req.body; await getPool().query('INSERT INTO shareholder VALUES (?,?,?,?)', [shareholder_id,name,type,contact]); if(percentage_owned) await getPool().query('INSERT INTO owns VALUES (1,?,?,?)', [shareholder_id,percentage_owned,share_type||'Equity']); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }
});
router.delete('/shareholders/:id', async (req, res) => {
  try { await getPool().query('DELETE FROM shareholder WHERE shareholder_id=?', [req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }
});

module.exports = router;
