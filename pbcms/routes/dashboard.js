const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');

router.get('/admin', async (req, res) => {
  try {
    const pool = getPool();
    const [[empCount]] = await pool.query('SELECT COUNT(*) as count FROM employee');
    const [[deptCount]] = await pool.query('SELECT COUNT(*) as count FROM department');
    const [[prodCount]] = await pool.query('SELECT COUNT(*) as count FROM product');
    const [[orderCount]] = await pool.query('SELECT COUNT(*) as count FROM purchase_order');
    const [[revenue]] = await pool.query('SELECT COALESCE(SUM(oli.quantity * oli.agreed_price),0) as total FROM order_line_items oli');
    const [[invValue]] = await pool.query('SELECT COALESCE(SUM(i.stock_quantity * p.selling_price),0) as total FROM inventory i JOIN product p ON i.product_id = p.product_id');
    const [[vehicleCount]] = await pool.query('SELECT COUNT(*) as count FROM vehicle');
    const [[caseCount]] = await pool.query('SELECT COUNT(*) as count FROM legal_case WHERE status != "Closed"');
    const [recentOrders] = await pool.query('SELECT po.*, b.company_name FROM purchase_order po LEFT JOIN buyer b ON po.buyer_id = b.buyer_id ORDER BY po.order_date DESC LIMIT 5');
    const [deptDist] = await pool.query('SELECT d.dept_name, COUNT(e.emp_id) as count FROM department d LEFT JOIN employee e ON d.dept_id = e.dept_id GROUP BY d.dept_id, d.dept_name');
    res.json({ employees: empCount.count, departments: deptCount.count, products: prodCount.count, orders: orderCount.count, revenue: revenue.total, inventoryValue: invValue.total, vehicles: vehicleCount.count, activeCases: caseCount.count, recentOrders, deptDistribution: deptDist });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/hr', async (req, res) => {
  try {
    const pool = getPool();
    const [[empCount]] = await pool.query('SELECT COUNT(*) as count FROM employee');
    const [[avgSalary]] = await pool.query('SELECT ROUND(AVG(salary),2) as avg FROM employee');
    const [[totalSalary]] = await pool.query('SELECT SUM(salary) as total FROM employee');
    const [deptDist] = await pool.query('SELECT d.dept_name, COUNT(e.emp_id) as count FROM department d LEFT JOIN employee e ON d.dept_id = e.dept_id GROUP BY d.dept_id, d.dept_name');
    const [roleDist] = await pool.query(`SELECT 'Manager' as role, COUNT(*) as count FROM manager UNION ALL SELECT 'Engineer', COUNT(*) FROM engineer UNION ALL SELECT 'Supervisor', COUNT(*) FROM supervisor UNION ALL SELECT 'Accountant', COUNT(*) FROM accountant UNION ALL SELECT 'Lawyer', COUNT(*) FROM lawyer UNION ALL SELECT 'Truck Driver', COUNT(*) FROM truck_driver UNION ALL SELECT 'Labour', COUNT(*) FROM labour`);
    res.json({ employees: empCount.count, avgSalary: avgSalary.avg, totalSalary: totalSalary.total, deptDistribution: deptDist, roleDistribution: roleDist });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/production', async (req, res) => {
  try {
    const pool = getPool();
    const [[unitCount]] = await pool.query('SELECT COUNT(*) as count FROM production_unit');
    const [[partCount]] = await pool.query('SELECT COUNT(*) as count FROM part');
    const [[totalProduced]] = await pool.query('SELECT COALESCE(SUM(quantity),0) as total FROM produces_rel');
    const [[prodCount]] = await pool.query('SELECT COUNT(*) as count FROM product');
    const [recentProd] = await pool.query('SELECT pr.*, p.product_name, pu.unit_name FROM produces_rel pr JOIN product p ON pr.product_id = p.product_id JOIN production_unit pu ON pr.unit_id = pu.unit_id ORDER BY pr.production_date DESC LIMIT 5');
    res.json({ units: unitCount.count, parts: partCount.count, totalProduced: totalProduced.total, products: prodCount.count, recentProduction: recentProd });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/inventory', async (req, res) => {
  try {
    const pool = getPool();
    const [[shopCount]] = await pool.query('SELECT COUNT(*) as count FROM shop');
    const [[totalStock]] = await pool.query('SELECT COALESCE(SUM(stock_quantity),0) as total FROM inventory');
    const [[lowStock]] = await pool.query('SELECT COUNT(*) as count FROM inventory WHERE stock_quantity < 50');
    const [[invValue]] = await pool.query('SELECT COALESCE(SUM(i.stock_quantity * p.selling_price),0) as total FROM inventory i JOIN product p ON i.product_id = p.product_id');
    const [stockByShop] = await pool.query('SELECT s.location, SUM(i.stock_quantity) as total FROM shop s LEFT JOIN inventory i ON s.shop_id = i.shop_id GROUP BY s.shop_id, s.location');
    res.json({ shops: shopCount.count, totalStock: totalStock.total, lowStockAlerts: lowStock.count, inventoryValue: invValue.total, stockByShop });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/finance', async (req, res) => {
  try {
    const pool = getPool();
    const [[revenue]] = await pool.query('SELECT COALESCE(SUM(quantity * agreed_price),0) as total FROM order_line_items');
    const [[pendingOrders]] = await pool.query("SELECT COUNT(*) as count FROM purchase_order WHERE status = 'Pending'");
    const [[totalDuty]] = await pool.query('SELECT COALESCE(SUM(duty_amount),0) as total FROM customs_record');
    const [[totalConsult]] = await pool.query('SELECT COALESCE(SUM(fee),0) as total FROM consultation');
    const [[totalSalary]] = await pool.query('SELECT COALESCE(SUM(salary),0) as total FROM employee');
    const [ordersByStatus] = await pool.query('SELECT status, COUNT(*) as count FROM purchase_order GROUP BY status');
    res.json({ revenue: revenue.total, pendingOrders: pendingOrders.count, totalDuty: totalDuty.total, consultationFees: totalConsult.total, salaryCost: totalSalary.total, ordersByStatus });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/legal', async (req, res) => {
  try {
    const pool = getPool();
    const [[totalCases]] = await pool.query('SELECT COUNT(*) as count FROM legal_case');
    const [[activeCases]] = await pool.query("SELECT COUNT(*) as count FROM legal_case WHERE status NOT IN ('Closed')");
    const [[totalDuty]] = await pool.query('SELECT COALESCE(SUM(duty_amount),0) as total FROM customs_record');
    const [[lawyerCount]] = await pool.query('SELECT COUNT(*) as count FROM lawyer');
    const [casesByStatus] = await pool.query('SELECT status, COUNT(*) as count FROM legal_case GROUP BY status');
    res.json({ totalCases: totalCases.count, activeCases: activeCases.count, totalDuty: totalDuty.total, lawyers: lawyerCount.count, casesByStatus });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/logistics', async (req, res) => {
  try {
    const pool = getPool();
    const [[vehicleCount]] = await pool.query('SELECT COUNT(*) as count FROM vehicle');
    const [[assignedCount]] = await pool.query('SELECT COUNT(DISTINCT vehicle_id) as count FROM vehicle_assignment');
    const [[driverCount]] = await pool.query('SELECT COUNT(*) as count FROM truck_driver');
    const [[maintCount]] = await pool.query('SELECT COUNT(*) as count FROM maintenance_log');
    const [vehicleTypes] = await pool.query('SELECT type, COUNT(*) as count FROM vehicle GROUP BY type');
    res.json({ vehicles: vehicleCount.count, assigned: assignedCount.count, drivers: driverCount.count, maintenanceLogs: maintCount.count, vehicleTypes });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/buyer', async (req, res) => {
  try {
    const pool = getPool();
    const [[orderCount]] = await pool.query('SELECT COUNT(*) as count FROM purchase_order');
    const [[totalSpent]] = await pool.query('SELECT COALESCE(SUM(quantity * agreed_price),0) as total FROM order_line_items');
    const [[prodCount]] = await pool.query('SELECT COUNT(*) as count FROM product');
    const [recentOrders] = await pool.query('SELECT po.*, b.company_name FROM purchase_order po LEFT JOIN buyer b ON po.buyer_id = b.buyer_id ORDER BY po.order_date DESC LIMIT 5');
    res.json({ orders: orderCount.count, totalSpent: totalSpent.total, availableProducts: prodCount.count, recentOrders });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/shareholder', async (req, res) => {
  try {
    const pool = getPool();
    const [[company]] = await pool.query('SELECT * FROM company LIMIT 1');
    const [shareholders] = await pool.query('SELECT s.*, o.percentage_owned, o.share_type FROM shareholder s JOIN owns o ON s.shareholder_id = o.shareholder_id');
    const [[totalOwnership]] = await pool.query('SELECT SUM(percentage_owned) as total FROM owns');
    res.json({ company, shareholders, totalOwnership: totalOwnership.total });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
