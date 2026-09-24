const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');
const pool = () => getPool();

// Vehicles
router.get('/', async (req, res) => { try { const [r] = await pool().query('SELECT * FROM vehicle ORDER BY vehicle_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/', async (req, res) => { try { const {vehicle_id,type,registration_no}=req.body; await pool().query('INSERT INTO vehicle VALUES(?,?,?)',[vehicle_id,type,registration_no]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.put('/:id', async (req, res) => { try { const {type,registration_no}=req.body; await pool().query('UPDATE vehicle SET type=?,registration_no=? WHERE vehicle_id=?',[type,registration_no,req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});
router.delete('/:id', async (req, res) => { try { await pool().query('DELETE FROM vehicle WHERE vehicle_id=?',[req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Assignments
router.get('/assignments', async (req, res) => { try { const [r] = await pool().query('SELECT va.*, v.type, v.registration_no, e.name as driver_name FROM vehicle_assignment va JOIN vehicle v ON va.vehicle_id=v.vehicle_id JOIN employee e ON va.emp_id_driver=e.emp_id'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/assignments', async (req, res) => { try { const {vehicle_id,emp_id_driver}=req.body; await pool().query('INSERT INTO vehicle_assignment VALUES(?,?)',[vehicle_id,emp_id_driver]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

// Maintenance
router.get('/maintenance', async (req, res) => { try { const [r] = await pool().query('SELECT ml.*, v.type, v.registration_no, e.name as mechanic_name FROM maintenance_log ml JOIN vehicle v ON ml.vehicle_id=v.vehicle_id JOIN employee e ON ml.emp_id_mechanic=e.emp_id ORDER BY ml.service_date DESC'); res.json(r); } catch(e) { res.status(500).json({error:e.message}); }});
router.post('/maintenance', async (req, res) => { try { const {emp_id_mechanic,vehicle_id,service_date,service_details}=req.body; await pool().query('INSERT INTO maintenance_log VALUES(?,?,?,?)',[emp_id_mechanic,vehicle_id,service_date,service_details]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }});

module.exports = router;
