const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');
const pool = () => getPool();

router.get('/', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM buyer ORDER BY buyer_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/', async (req, res) => { try { const {buyer_id,company_name,gst_no,contact_person}=req.body; await pool().query('INSERT INTO buyer VALUES(?,?,?,?)',[buyer_id,company_name,gst_no,contact_person]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.put('/:id', async (req, res) => { try { const {company_name,gst_no,contact_person}=req.body; await pool().query('UPDATE buyer SET company_name=?,gst_no=?,contact_person=? WHERE buyer_id=?',[company_name,gst_no,contact_person,req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.delete('/:id', async (req, res) => { try { await pool().query('DELETE FROM buyer WHERE buyer_id=?',[req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

module.exports = router;
