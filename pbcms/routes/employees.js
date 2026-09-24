const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await getPool().query(`SELECT e.*, d.dept_name,
      m.grade as manager_grade, en.role_type as engineer_type, td.license_type as driver_license,
      l.role_type as labour_type, s.license_type as supervisor_license, a.license_type as accountant_license,
      lw.lawyer_spec,
      CASE WHEN m.emp_id IS NOT NULL THEN 'Manager' WHEN en.emp_id IS NOT NULL THEN 'Engineer'
        WHEN td.emp_id IS NOT NULL THEN 'Truck Driver' WHEN l.emp_id IS NOT NULL THEN 'Labour'
        WHEN s.emp_id IS NOT NULL THEN 'Supervisor' WHEN a.emp_id IS NOT NULL THEN 'Accountant'
        WHEN lw.emp_id IS NOT NULL THEN 'Lawyer' ELSE 'General' END as role_type
      FROM employee e LEFT JOIN department d ON e.dept_id = d.dept_id
      LEFT JOIN manager m ON e.emp_id = m.emp_id LEFT JOIN engineer en ON e.emp_id = en.emp_id
      LEFT JOIN truck_driver td ON e.emp_id = td.emp_id LEFT JOIN labour l ON e.emp_id = l.emp_id
      LEFT JOIN supervisor s ON e.emp_id = s.emp_id LEFT JOIN accountant a ON e.emp_id = a.emp_id
      LEFT JOIN lawyer lw ON e.emp_id = lw.emp_id ORDER BY e.emp_id`);
    res.json(rows);
  } catch(e) { res.status(500).json({error:e.message}); }
});

router.post('/', async (req, res) => {
  try {
    const { emp_id, name, dob, phone, salary, joining_date, dept_id, role, role_detail } = req.body;
    const pool = getPool();
    await pool.query('INSERT INTO employee VALUES (?,?,?,?,?,?,?)', [emp_id,name,dob,phone,salary,joining_date,dept_id]);
    if (role === 'Manager') await pool.query('INSERT INTO manager VALUES (?,?)', [emp_id, role_detail||'A1']);
    else if (role === 'Engineer') await pool.query('INSERT INTO engineer VALUES (?,?)', [emp_id, role_detail||'General']);
    else if (role === 'Truck Driver') await pool.query('INSERT INTO truck_driver VALUES (?,?)', [emp_id, role_detail||'Standard']);
    else if (role === 'Labour') await pool.query('INSERT INTO labour VALUES (?,?)', [emp_id, role_detail||'General']);
    else if (role === 'Supervisor') await pool.query('INSERT INTO supervisor VALUES (?,?)', [emp_id, role_detail||'Standard']);
    else if (role === 'Accountant') await pool.query('INSERT INTO accountant VALUES (?,?)', [emp_id, role_detail||'Standard']);
    else if (role === 'Lawyer') await pool.query('INSERT INTO lawyer VALUES (?,?)', [emp_id, role_detail||'General']);
    res.json({success:true});
  } catch(e) { res.status(500).json({error:e.message}); }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, phone, salary, dept_id } = req.body;
    await getPool().query('UPDATE employee SET name=?, phone=?, salary=?, dept_id=? WHERE emp_id=?', [name,phone,salary,dept_id,req.params.id]);
    res.json({success:true});
  } catch(e) { res.status(500).json({error:e.message}); }
});

router.delete('/:id', async (req, res) => {
  try { await getPool().query('DELETE FROM employee WHERE emp_id=?', [req.params.id]); res.json({success:true}); } catch(e) { res.status(500).json({error:e.message}); }
});

module.exports = router;
