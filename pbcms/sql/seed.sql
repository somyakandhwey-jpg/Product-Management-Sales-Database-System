-- ============================================
-- PBCMS: Seed Data for Demo
-- ============================================

-- Users (password for all: 'password123')
-- Hash generated with bcryptjs cost=10
INSERT IGNORE INTO users (username, password_hash, role, display_name) VALUES
('admin',      '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'admin',       'System Administrator'),
('hr_manager',  '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'hr',          'Meera Kapoor'),
('prod_head',   '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'production',  'Rajesh Kumar'),
('inv_manager', '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'inventory',   'Sunil Mehta'),
('fin_head',    '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'finance',     'Karan Johar'),
('legal_head',  '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'legal',       'Priya Das'),
('log_manager', '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'logistics',   'Ramesh Yadav'),
('buyer_user',  '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'buyer',       'Vikram Singh'),
('share_user',  '$2a$10$X7UrE8Kz5YQx5a1nN5e4aOVFhG3kR5sVxJgO3mCj3PqN2wQ7tK9Wy', 'shareholder',  'Rahul Sharma');

-- Company
INSERT IGNORE INTO company VALUES (1, 'Apex Industries Pvt. Ltd.', 'Public', 'REG-2024-MH-0456', 'Mumbai, Maharashtra', 1995);

-- Departments
INSERT IGNORE INTO department VALUES
(10, 'Production',  'Block A - Factory Floor'),
(20, 'Logistics',   'Block B - Warehouse Zone'),
(30, 'Legal',       'Head Office - Floor 5'),
(40, 'Finance',     'Head Office - Floor 3'),
(50, 'IT',          'Head Office - Floor 4'),
(60, 'HR',          'Head Office - Floor 2'),
(70, 'Customs',     'Port Office - Dock 7'),
(80, 'Consultancy', 'Head Office - Floor 6');

-- Shareholders
INSERT IGNORE INTO shareholder VALUES
(101, 'Rahul Sharma',    'Individual',    '9876543210'),
(102, 'Priya Investments','Institutional', '022-4455667'),
(103, 'Global Equity Fund','Institutional','011-9988776'),
(104, 'Anil Kapoor',      'Individual',   '8899001122'),
(105, 'SRM Capital',      'Institutional', '044-2233445');

-- Owns
INSERT IGNORE INTO owns VALUES
(1, 101, 15.50, 'Equity'),
(1, 102, 22.00, 'Preference'),
(1, 103, 18.75, 'Equity'),
(1, 104, 8.00,  'Equity'),
(1, 105, 12.50, 'Preference');

-- Products
INSERT IGNORE INTO product VALUES
(501, 'Industrial Pump',    'Machinery',    15000.00, 25000.00),
(502, 'Hydraulic Motor',    'Machinery',    22000.00, 38000.00),
(503, 'Control Panel',      'Electronics',  8000.00,  14000.00),
(504, 'Smart Sensor',       'Electronics',  2500.00,  4500.00),
(505, 'Safety Helmet',      'Accessories',  500.00,   950.00),
(506, 'Steel Beam',         'Raw Material', 3000.00,  5200.00),
(507, 'Conveyor Belt',      'Machinery',    12000.00, 19500.00),
(508, 'Torque Wrench',      'Tools',        1800.00,  3200.00),
(509, 'Pressure Gauge',     'Instruments',  1200.00,  2100.00),
(510, 'Electric Winch',     'Machinery',    18000.00, 32000.00);

-- Parts
INSERT IGNORE INTO part VALUES
(1001, 'Steel Valve',      'Stainless Steel 304, 2-inch bore'),
(1002, 'Copper Coil',      'Enameled copper, 0.5mm gauge'),
(1003, 'Rubber Gasket',    'Nitrile, heat-resistant up to 200°C'),
(1004, 'Aluminum Housing', 'Die-cast, 6061-T6 alloy'),
(1005, 'Circuit Board',    'FR-4, double-sided, RoHS compliant');

-- Production Units
INSERT IGNORE INTO production_unit VALUES
(1, 'Assembly Line Alpha', 'Factory Floor 1 - Block A'),
(2, 'Fabrication Bay',     'Factory Floor 2 - Block A'),
(3, 'Electronics Lab',     'Factory Floor 3 - Block A'),
(4, 'Testing Chamber',     'Quality Wing - Block A');

-- Shops
INSERT IGNORE INTO shop VALUES
(1, 'Warehouse North - Mumbai'),
(2, 'Warehouse South - Chennai'),
(3, 'Warehouse East - Kolkata'),
(4, 'Retail Outlet - Delhi');

-- Produces_Rel
INSERT IGNORE INTO produces_rel VALUES
(1, 501, '2026-01-15', 50),
(1, 502, '2026-01-20', 30),
(2, 506, '2026-02-01', 200),
(3, 503, '2026-02-10', 80),
(3, 504, '2026-02-15', 150),
(1, 507, '2026-03-01', 25),
(4, 509, '2026-03-10', 100);

-- Inventory
INSERT IGNORE INTO inventory VALUES
(1, 501, 120, '2026-03-15 10:00:00'),
(1, 502, 45,  '2026-03-15 10:00:00'),
(1, 503, 200, '2026-03-15 10:00:00'),
(2, 504, 350, '2026-03-15 10:00:00'),
(2, 505, 500, '2026-03-15 10:00:00'),
(3, 506, 80,  '2026-03-15 10:00:00'),
(3, 507, 15,  '2026-03-15 10:00:00'),
(4, 508, 90,  '2026-03-15 10:00:00'),
(4, 509, 60,  '2026-03-15 10:00:00'),
(1, 510, 25,  '2026-03-15 10:00:00');

-- Buyers
INSERT IGNORE INTO buyer VALUES
(201, 'BuildWell Constructions',   '27ABCDE1234F1Z5', 'Vikram Singh'),
(202, 'Reliance Industries Ltd.',  '27FGHIJ5678K2L3', 'Mukesh Kumar'),
(203, 'Tata Motors',               '27MNOPQ9012R3S4', 'Arvind Nair'),
(204, 'Infosys Ltd.',              '29RSTUV3456W4X5', 'Deepa Menon'),
(205, 'Larsen & Toubro',           '27WXYZA7890B5C6', 'Sanjay Gupta');

-- Purchase Orders
INSERT IGNORE INTO purchase_order VALUES
(5001, '2026-03-01', 'Confirmed', 201),
(5002, '2026-03-05', 'Pending',   202),
(5003, '2026-03-10', 'Shipped',   203),
(5004, '2026-03-15', 'Confirmed', 204),
(5005, '2026-03-20', 'Pending',   205),
(5006, '2026-04-01', 'Confirmed', 201),
(5007, '2026-04-05', 'Pending',   203);

-- Order Line Items
INSERT IGNORE INTO order_line_items VALUES
(5001, 501, 10, 24500.00),
(5001, 503, 20, 13500.00),
(5002, 502, 5,  37000.00),
(5002, 510, 3,  31000.00),
(5003, 504, 100,4200.00),
(5003, 505, 200,900.00),
(5004, 503, 30, 13000.00),
(5005, 506, 50, 5000.00),
(5005, 507, 10, 19000.00),
(5006, 501, 15, 24000.00),
(5007, 509, 40, 2000.00);

-- Employees
INSERT IGNORE INTO employee VALUES
(1,  'Amit Verma',     '1985-06-15', '9988776655', 85000.00,  '2015-01-10', 10),
(2,  'Suresh Kumar',   '1990-08-20', '8877665544', 45000.00,  '2018-05-20', 10),
(3,  'Ramesh Yadav',   '1992-02-10', '7766554433', 30000.00,  '2019-03-15', 20),
(4,  'Priya Das',      '1995-11-05', '6655443322', 92000.00,  '2020-07-01', 30),
(5,  'John Smith',     '1988-12-12', '5544332211', 18000.00,  '2017-09-10', 10),
(6,  'Anita Roy',      '1993-04-22', '4433221100', 38000.00,  '2021-02-10', 10),
(7,  'Karan Johar',    '1989-01-30', '3322110099', 55000.00,  '2016-11-12', 40),
(8,  'Deepak Patel',   '1991-07-08', '2211009988', 42000.00,  '2019-06-01', 50),
(9,  'Meera Kapoor',   '1994-03-18', '1100998877', 72000.00,  '2020-01-15', 60),
(10, 'Rohit Shetty',   '1987-09-25', '9900887766', 28000.00,  '2018-08-20', 20),
(11, 'Sanjay Gupta',   '1990-12-01', '8800776655', 35000.00,  '2021-04-10', 70),
(12, 'Neha Singh',     '1996-05-14', '7700665544', 48000.00,  '2022-01-05', 10),
(13, 'Vikash Dubey',   '1993-08-22', '6600554433', 52000.00,  '2019-09-15', 80),
(14, 'Arjun Nair',     '1988-11-30', '5500443322', 78000.00,  '2017-03-01', 30),
(15, 'Pooja Sharma',   '1995-02-28', '4400332211', 32000.00,  '2022-06-15', 40);

-- Manager
INSERT IGNORE INTO manager VALUES (1, 'A1'), (9, 'B2');

-- Engineer
INSERT IGNORE INTO engineer VALUES (2, 'Mechanical'), (8, 'Software'), (12, 'Electrical');

-- Truck Driver
INSERT IGNORE INTO truck_driver VALUES (3, 'Heavy Vehicle'), (10, 'Light Vehicle');

-- Labour
INSERT IGNORE INTO labour VALUES (5, 'Assembly'), (6, 'Welding');

-- Supervisor
INSERT IGNORE INTO supervisor VALUES (6, 'Shop Floor License');

-- Accountant
INSERT IGNORE INTO accountant VALUES (7, 'CPA'), (15, 'CA-Inter');

-- Lawyer
INSERT IGNORE INTO lawyer VALUES (4, 'Corporate Law'), (14, 'Import/Export Law');

-- Performs_Rel
INSERT IGNORE INTO performs_rel VALUES
(5,  1001, 'Machining'),
(2,  1002, 'Assembly'),
(12, 1005, 'Soldering'),
(6,  1003, 'Quality Check'),
(5,  1004, 'Finishing');

-- Vehicles
INSERT IGNORE INTO vehicle VALUES
(10, 'Truck',   'MH-01-AB-1234'),
(11, 'Truck',   'MH-02-CD-5678'),
(12, 'Van',     'KA-01-EF-9012'),
(13, 'Trailer', 'TN-09-GH-3456'),
(14, 'Pickup',  'DL-04-IJ-7890');

-- Vehicle Assignments
INSERT IGNORE INTO vehicle_assignment VALUES
(10, 3), (11, 10), (12, 3);

-- Maintenance Log
INSERT IGNORE INTO maintenance_log VALUES
(2, 10, '2026-01-15', 'Full engine oil change and filter replacement'),
(2, 11, '2026-02-20', 'Brake pad replacement and alignment'),
(8, 12, '2026-03-05', 'Tire rotation and AC servicing'),
(2, 13, '2026-03-18', 'Hydraulic system inspection');

-- Legal Cases
INSERT IGNORE INTO legal_case VALUES
(100, 'Patent Dispute',      'Ongoing'),
(101, 'Import Compliance',   'Closed'),
(102, 'Land Acquisition',    'Ongoing'),
(103, 'Export Regulation',   'Open'),
(104, 'Trademark Violation', 'Closed');

-- Case Handling
INSERT IGNORE INTO case_handling VALUES
(100, 4), (101, 14), (102, 4), (103, 14), (104, 4);

-- Customs Records
INSERT IGNORE INTO customs_record VALUES
(1, 'Export', 5000.00),
(2, 'Import', 45000.00),
(3, 'Export', 12000.00),
(4, 'Import', 78000.00),
(5, 'Export', 23000.00);

-- Consultations
INSERT IGNORE INTO consultation VALUES
(1, 'Tax Audit',          15000.00),
(2, 'Business Strategy',  50000.00),
(3, 'Legal Advisory',     25000.00),
(4, 'Compliance Review',  18000.00),
(5, 'Market Analysis',    35000.00);

-- Legal Case <-> Customs Record
INSERT IGNORE INTO legal_case_associated_with_record VALUES
(101, 2), (103, 1), (103, 3);

-- Case Handling <-> Consultation
INSERT IGNORE INTO case_handling_involves_consultation VALUES
(100, 3), (102, 1), (103, 4);
