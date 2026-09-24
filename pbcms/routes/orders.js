const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');
const pool = () => getPool();

router.get('/', async (req, res) => { try { const [r] = await pool().query('SELECT po.*, b.company_name FROM purchase_order po LEFT JOIN buyer b ON po.buyer_id=b.buyer_id ORDER BY po.order_date DESC'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/', async (req, res) => { try { const {order_id,order_date,status,buyer_id}=req.body; await pool().query('INSERT INTO purchase_order VALUES(?,?,?,?)',[order_id,order_date,status||'Pending',buyer_id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.put('/:id', async (req, res) => { try { const {status}=req.body; await pool().query('UPDATE purchase_order SET status=? WHERE order_id=?',[status,req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.delete('/:id', async (req, res) => { try { await pool().query('DELETE FROM purchase_order WHERE order_id=?',[req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Line items
router.get('/:id/items', async (req, res) => { try { const [r] = await pool().query('SELECT oli.*, p.product_name FROM order_line_items oli JOIN product p ON oli.product_id=p.product_id WHERE oli.order_id=?',[req.params.id]); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/:id/items', async (req, res) => { try { const {product_id,quantity,agreed_price}=req.body; await pool().query('INSERT INTO order_line_items VALUES(?,?,?,?)',[req.params.id,product_id,quantity,agreed_price]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Summary
router.get('/summary/all', async (req, res) => { try { const [r] = await pool().query('SELECT b.company_name, po.order_id, po.order_date, po.status, COUNT(oli.product_id) as items, SUM(oli.quantity*oli.agreed_price) as total_value FROM purchase_order po JOIN buyer b ON po.buyer_id=b.buyer_id JOIN order_line_items oli ON po.order_id=oli.order_id GROUP BY po.order_id, b.company_name, po.order_date, po.status ORDER BY total_value DESC'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});

module.exports = router;
