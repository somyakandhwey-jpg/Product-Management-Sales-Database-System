const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');
const pool = () => getPool();

// Shops
router.get('/shops', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM shop ORDER BY shop_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/shops', async (req, res) => { try { const {shop_id,location}=req.body; await pool().query('INSERT INTO shop VALUES(?,?)',[shop_id,location]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.delete('/shops/:id', async (req, res) => { try { await pool().query('DELETE FROM shop WHERE shop_id=?',[req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Inventory
router.get('/', async (req, res) => { try { const [r] = await pool().query('SELECT i.*, s.location as shop_location, p.product_name, p.selling_price FROM inventory i JOIN shop s ON i.shop_id=s.shop_id JOIN product p ON i.product_id=p.product_id ORDER BY i.shop_id, i.product_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.put('/', async (req, res) => { try { const {shop_id,product_id,stock_quantity}=req.body; await pool().query('UPDATE inventory SET stock_quantity=?, last_updated=NOW() WHERE shop_id=? AND product_id=?',[stock_quantity,shop_id,product_id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/', async (req, res) => { try { const {shop_id,product_id,stock_quantity}=req.body; await pool().query('INSERT INTO inventory VALUES(?,?,?,NOW())',[shop_id,product_id,stock_quantity]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

module.exports = router;
