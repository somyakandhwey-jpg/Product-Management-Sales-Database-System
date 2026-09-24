const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');
const pool = () => getPool();

// Legal Cases
router.get('/cases', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM legal_case ORDER BY case_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/cases', async (req, res) => { try { const {case_id,case_type,status}=req.body; await pool().query('INSERT INTO legal_case VALUES(?,?,?)',[case_id,case_type,status]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.put('/cases/:id', async (req, res) => { try { const {case_type,status}=req.body; await pool().query('UPDATE legal_case SET case_type=?,status=? WHERE case_id=?',[case_type,status,req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.delete('/cases/:id', async (req, res) => { try { await pool().query('DELETE FROM legal_case WHERE case_id=?',[req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Case Handling
router.get('/handling', async (req, res) => { try { const [r] = await pool().query('SELECT ch.*, lc.case_type, lc.status, e.name as lawyer_name, lw.lawyer_spec FROM case_handling ch JOIN legal_case lc ON ch.case_id=lc.case_id JOIN employee e ON ch.emp_id_lawyer=e.emp_id JOIN lawyer lw ON ch.emp_id_lawyer=lw.emp_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/handling', async (req, res) => { try { const {case_id,emp_id_lawyer}=req.body; await pool().query('INSERT INTO case_handling VALUES(?,?)',[case_id,emp_id_lawyer]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Customs
router.get('/customs', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM customs_record ORDER BY record_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/customs', async (req, res) => { try { const {record_id,import_export,duty_amount}=req.body; await pool().query('INSERT INTO customs_record VALUES(?,?,?)',[record_id,import_export,duty_amount]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Consultations
router.get('/consultations', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM consultation ORDER BY consult_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/consultations', async (req, res) => { try { const {consult_id,type,fee}=req.body; await pool().query('INSERT INTO consultation VALUES(?,?,?)',[consult_id,type,fee]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

module.exports = router;
