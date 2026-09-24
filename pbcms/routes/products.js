const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');
const pool = () => getPool();

// Products
router.get('/', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM product ORDER BY product_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/', async (req, res) => { try { const {product_id,product_name,category,cost_price,selling_price}=req.body; await pool().query('INSERT INTO product VALUES(?,?,?,?,?)',[product_id,product_name,category,cost_price,selling_price]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.put('/:id', async (req, res) => { try { const {product_name,category,cost_price,selling_price}=req.body; await pool().query('UPDATE product SET product_name=?,category=?,cost_price=?,selling_price=? WHERE product_id=?',[product_name,category,cost_price,selling_price,req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.delete('/:id', async (req, res) => { try { await pool().query('DELETE FROM product WHERE product_id=?',[req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Parts
router.get('/parts', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM part ORDER BY part_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/parts', async (req, res) => { try { const {part_id,part_name,specification}=req.body; await pool().query('INSERT INTO part VALUES(?,?,?)',[part_id,part_name,specification]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.delete('/parts/:id', async (req, res) => { try { await pool().query('DELETE FROM part WHERE part_id=?',[req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Production Units
router.get('/units', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM production_unit ORDER BY unit_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/units', async (req, res) => { try { const {unit_id,unit_name,location}=req.body; await pool().query('INSERT INTO production_unit VALUES(?,?,?)',[unit_id,unit_name,location]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.delete('/units/:id', async (req, res) => { try { await pool().query('DELETE FROM production_unit WHERE unit_id=?',[req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Produces_Rel
router.get('/produces', async (req, res) => { try { const [r] = await pool().query('SELECT pr.*, p.product_name, pu.unit_name FROM produces_rel pr JOIN product p ON pr.product_id=p.product_id JOIN production_unit pu ON pr.unit_id=pu.unit_id ORDER BY pr.production_date DESC'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/produces', async (req, res) => { try { const {unit_id,product_id,production_date,quantity}=req.body; await pool().query('INSERT INTO produces_rel VALUES(?,?,?,?)',[unit_id,product_id,production_date,quantity]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Performs_Rel
router.get('/performs', async (req, res) => { try { const [r] = await pool().query('SELECT pr.*, e.name as emp_name, p.part_name FROM performs_rel pr JOIN employee e ON pr.emp_id=e.emp_id JOIN part p ON pr.part_id=p.part_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/performs', async (req, res) => { try { const {emp_id,part_id,role_type}=req.body; await pool().query('INSERT INTO performs_rel VALUES(?,?,?)',[emp_id,part_id,role_type]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

module.exports = router;
