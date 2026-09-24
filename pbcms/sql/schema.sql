-- ============================================
-- PBCMS: Product-Based Company Management System
-- Full Schema — 31 tables + users table
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS company (
  company_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  registration_no VARCHAR(50) UNIQUE,
  headquarters VARCHAR(100) NOT NULL,
  established_year INT
);

CREATE TABLE IF NOT EXISTS shareholder (
  shareholder_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  contact VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS owns (
  company_id INT,
  shareholder_id INT,
  percentage_owned DECIMAL(5,2) NOT NULL,
  share_type VARCHAR(50),
  PRIMARY KEY (company_id, shareholder_id),
  FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
  FOREIGN KEY (shareholder_id) REFERENCES shareholder(shareholder_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS department (
  dept_id INT PRIMARY KEY,
  dept_name VARCHAR(100) NOT NULL,
  location VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS product (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  cost_price DECIMAL(10,2) NOT NULL,
  selling_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS part (
  part_id INT PRIMARY KEY,
  part_name VARCHAR(100) NOT NULL,
  specification TEXT
);

CREATE TABLE IF NOT EXISTS production_unit (
  unit_id INT PRIMARY KEY,
  unit_name VARCHAR(100) NOT NULL,
  location VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS shop (
  shop_id INT PRIMARY KEY,
  location VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS produces_rel (
  unit_id INT,
  product_id INT,
  production_date DATE NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (unit_id, product_id, production_date),
  FOREIGN KEY (unit_id) REFERENCES production_unit(unit_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory (
  shop_id INT,
  product_id INT,
  stock_quantity INT NOT NULL,
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (shop_id, product_id),
  FOREIGN KEY (shop_id) REFERENCES shop(shop_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS buyer (
  buyer_id INT PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL,
  gst_no VARCHAR(20) UNIQUE,
  contact_person VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS purchase_order (
  order_id INT PRIMARY KEY,
  order_date DATE NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Pending',
  buyer_id INT,
  FOREIGN KEY (buyer_id) REFERENCES buyer(buyer_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_line_items (
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  agreed_price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES purchase_order(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employee (
  emp_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  dob DATE,
  phone VARCHAR(15),
  salary DECIMAL(10,2),
  joining_date DATE,
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES department(dept_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS manager (
  emp_id INT PRIMARY KEY,
  grade VARCHAR(10),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS engineer (
  emp_id INT PRIMARY KEY,
  role_type VARCHAR(50),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS truck_driver (
  emp_id INT PRIMARY KEY,
  license_type VARCHAR(20),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS labour (
  emp_id INT PRIMARY KEY,
  role_type VARCHAR(50),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS supervisor (
  emp_id INT PRIMARY KEY,
  license_type VARCHAR(50),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS accountant (
  emp_id INT PRIMARY KEY,
  license_type VARCHAR(50),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lawyer (
  emp_id INT PRIMARY KEY,
  lawyer_spec VARCHAR(100),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS performs_rel (
  emp_id INT,
  part_id INT,
  role_type VARCHAR(50),
  PRIMARY KEY (emp_id, part_id),
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE,
  FOREIGN KEY (part_id) REFERENCES part(part_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicle (
  vehicle_id INT PRIMARY KEY,
  type VARCHAR(50),
  registration_no VARCHAR(20) UNIQUE
);

CREATE TABLE IF NOT EXISTS vehicle_assignment (
  vehicle_id INT,
  emp_id_driver INT,
  PRIMARY KEY (vehicle_id, emp_id_driver),
  FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id) ON DELETE CASCADE,
  FOREIGN KEY (emp_id_driver) REFERENCES truck_driver(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS maintenance_log (
  emp_id_mechanic INT,
  vehicle_id INT,
  service_date DATE NOT NULL,
  service_details TEXT,
  PRIMARY KEY (emp_id_mechanic, vehicle_id, service_date),
  FOREIGN KEY (emp_id_mechanic) REFERENCES employee(emp_id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS legal_case (
  case_id INT PRIMARY KEY,
  case_type VARCHAR(50),
  status VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS case_handling (
  case_id INT,
  emp_id_lawyer INT,
  PRIMARY KEY (case_id, emp_id_lawyer),
  FOREIGN KEY (case_id) REFERENCES legal_case(case_id) ON DELETE CASCADE,
  FOREIGN KEY (emp_id_lawyer) REFERENCES lawyer(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS customs_record (
  record_id INT PRIMARY KEY,
  import_export VARCHAR(10) CHECK (import_export IN ('Import','Export')),
  duty_amount DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS consultation (
  consult_id INT PRIMARY KEY,
  type VARCHAR(50),
  fee DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS department_has_employees (
  dept_id INT,
  emp_id INT,
  PRIMARY KEY (dept_id, emp_id),
  FOREIGN KEY (dept_id) REFERENCES department(dept_id) ON DELETE CASCADE,
  FOREIGN KEY (emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contains_order_line_items (
  order_id INT,
  product_id INT,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES purchase_order(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS legal_case_associated_with_record (
  case_id INT,
  record_id INT,
  PRIMARY KEY (case_id, record_id),
  FOREIGN KEY (case_id) REFERENCES legal_case(case_id) ON DELETE CASCADE,
  FOREIGN KEY (record_id) REFERENCES customs_record(record_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS case_handling_involves_consultation (
  case_id INT,
  consult_id INT,
  PRIMARY KEY (case_id, consult_id),
  FOREIGN KEY (case_id) REFERENCES legal_case(case_id) ON DELETE CASCADE,
  FOREIGN KEY (consult_id) REFERENCES consultation(consult_id) ON DELETE CASCADE
);
