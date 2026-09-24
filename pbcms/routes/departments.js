const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');

router.get('/', async (req, res) => {
  try { const [rows] = await getPool().query('SELECT d.*, (SELECT COUNT(*) FROM employee e WHERE e.dept_id = d.dept_id) as emp_count FROM department d ORDER BY d.dept_id'); res.json(rows); } catch(e) { res.status(500).json({error:e.message}); }
});
router.post('/', async (req, res) => {
  try { const { dept_id, dept_name, location } = req.body; await getPool().query('INSERT INTO department VALUES (?,?,?)', [dept_id,dept_name,location]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }
});
router.put('/:id', async (req, res) => {
  try { const { dept_name, location } = req.body; await getPool().query('UPDATE department SET dept_name=?, location=? WHERE dept_id=?', [dept_name,location,req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }
});
router.delete('/:id', async (req, res) => {
  try { await getPool().query('DELETE FROM department WHERE dept_id=?', [req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }
});

module.exports = router;
