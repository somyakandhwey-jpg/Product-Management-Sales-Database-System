# Product-Based Company Management System â€” Complete Project Blueprint

## ðŸ“‹ Project Overview

| Field | Detail |
|-------|--------|
| **Title** | Product-Based Company Management System |
| **Course** | 21CSC205P â€” Database Management Systems |
| **Students** |Somya Kandhwey (RA2411027010137) |
| **Guide** | Dr. Ari Kumar K S (Asst. Professor, DSBS) |
| **Institution** | SRM Institute of Science and Technology, Kattankulathur |
| **Department** | Networking and Communications, School of Computing |
| **Specialization** | Computer Science Engineering (Big Data Analytics) |
| **Database Name** | `pbcompany` |
| **Total Tables** | 31 |

---

## ðŸ“ Abstract

A centralized DBMS for a manufacturing-oriented organization covering: employee management, departmental hierarchy, product cataloging, inventory tracking, shareholder ownership, and B2B buyer transactions. Built using ER modeling and relational schema design with normalization up to 5NF. Uses SQL DDL/DML for table creation, data insertion, and complex queries.

---

## ðŸŽ¯ Problem Statement

Design a robust and scalable DBMS for a manufacturing company that:
- Stores and manages employee, department, product, inventory, shareholder, and buyer data
- Eliminates data redundancy and inconsistency
- Supports complex organizational hierarchies
- Enables role-based data access
- Accurately represents real-world business operations

---

## ðŸ“Œ Functional Requirements

- Store company details and departments
- Maintain employee records with role-based hierarchy
- Track labor categories, supervisors, engineers, and managers
- Manage product types and production processes
- Track inventory across multiple shops
- Allow B2B buyers to view production and inventory status
- Maintain shareholder information (public/private ownership)
- Manage logistics, legal, consulting, and customs operations

## ðŸ“Œ Non-Functional Requirements

- Data consistency and integrity
- Scalability for future expansion
- Secure and restricted data access
- Clear ER representation
- Normalized database design (up to 5NF)

---

## ðŸ—ï¸ Major Entities

| # | Entity | Description |
|---|--------|-------------|
| 1 | Company | Central organization entity |
| 2 | Department | Organizational divisions |
| 3 | Employee | Base employee records |
| 4 | Labour | General labor sub-type |
| 5 | Manager | Manager sub-type |
| 6 | Engineer | Engineer sub-type |
| 7 | Supervisor | Supervisor sub-type |
| 8 | Accountant | Accounting sub-type |
| 9 | Truck Driver | Driver sub-type |
| 10 | Lawyer | Legal staff sub-type |
| 11 | Product | Manufactured goods |
| 12 | Part | Raw parts for production |
| 13 | Production Unit | Factory locations |
| 14 | Shop | Retail/warehouse outlets |
| 15 | Buyer (B2B) | Business customers |
| 16 | Shareholder | Equity holders |
| 17 | Vehicle | Company fleet |
| 18 | Legal Case | Legal proceedings |
| 19 | Customs Record | Import/export duties |
| 20 | Consultation | Advisory services |

---

## ðŸ”— Key Relationships

| Relationship | Cardinality |
|-------------|-------------|
| Company â†’ Departments | 1:N |
| Department â†’ Employees | 1:N |
| Employee â†’ Department | N:1 |
| Product â†’ Product Category | N:1 |
| Shop â†’ Products (Inventory) | M:N |
| Company â†’ Shareholders (Owns) | M:N |
| Buyer â†’ Products (Purchase Order) | M:N |
| Employee â†’ Parts (Performs_Rel) | M:N |
| Production Unit â†’ Products (Produces_Rel) | M:N |
| Vehicle â†’ Driver (Vehicle_Assignment) | M:N |
| Legal Case â†’ Lawyer (Case_Handling) | M:N |

---

## ðŸ‘¥ Employee Classification Hierarchy

```
Employee (Base)
â”œâ”€â”€ Production Labor
â”‚   â”œâ”€â”€ Managers (grade)
â”‚   â”œâ”€â”€ Supervisors (license_type)
â”‚   â”œâ”€â”€ Engineers (role_type)
â”‚   â””â”€â”€ Labour (role_type)
â”œâ”€â”€ Accounting Department
â”‚   â””â”€â”€ Accountant (license_type / CPA)
â”œâ”€â”€ Transport Department
â”‚   â””â”€â”€ Truck Driver (license_type)
â”œâ”€â”€ Legal Department
â”‚   â””â”€â”€ Lawyer (lawyer_spec)
â”œâ”€â”€ IT Department
â”œâ”€â”€ Public Relations Department
â”œâ”€â”€ Customs Department
â””â”€â”€ Consultancy
```

---

## ðŸ—„ï¸ Complete Database Schema (31 Tables)

### Table Set 1: Organization & Management

#### 1. COMPANY
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| company_id | INT | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| type | ENUM('PUBLIC','PRIVATE') | NOT NULL |
| registration_no | VARCHAR(50) | UNIQUE |
| headquarters | VARCHAR(100) | NOT NULL |
| established_year | YEAR | NOT NULL |

#### 2. DEPARTMENT
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| dept_id | INT | PRIMARY KEY |
| dept_name | VARCHAR(100) | NOT NULL |
| location | VARCHAR(100) | NOT NULL |

#### 3. SHAREHOLDER
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| shareholder_id | INT | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| type | ENUM('PUBLIC','PRIVATE') | NOT NULL |
| contact | VARCHAR(50) | NOT NULL |

#### 4. OWNS
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| company_id | INT | FK â†’ COMPANY |
| shareholder_id | INT | FK â†’ SHAREHOLDER |
| percentage_owned | DECIMAL(5,2) | NOT NULL |
| share_type | VARCHAR(50) | NOT NULL |
| *(company_id, shareholder_id)* | â€” | COMPOSITE PK |

#### 5. DEPARTMENT_HAS_EMPLOYEES *(junction)*
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| dept_id | INT | FK â†’ DEPARTMENT |
| emp_id | INT | FK â†’ EMPLOYEE |

---

### Table Set 2: Production & Inventory

#### 6. PRODUCT
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| product_id | INT | PRIMARY KEY |
| product_name | VARCHAR(100) | NOT NULL |
| category | VARCHAR(50) | NOT NULL |
| cost_price | DECIMAL(10,2) | NOT NULL |
| selling_price | DECIMAL(10,2) | NOT NULL |

#### 7. PART
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| part_id | INT | PRIMARY KEY |
| part_name | VARCHAR(100) | NOT NULL |
| specification | TEXT | NOT NULL |

#### 8. PRODUCTION_UNIT
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| unit_id | INT | PRIMARY KEY |
| unit_name | VARCHAR(100) | NOT NULL |
| location | VARCHAR(100) | NOT NULL |

#### 9. PRODUCES_REL
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| unit_id | INT | FK â†’ PRODUCTION_UNIT |
| product_id | INT | FK â†’ PRODUCT |
| production_date | DATE | NOT NULL |
| quantity | INT | NOT NULL |
| *(unit_id, product_id, production_date)* | â€” | COMPOSITE PK |

#### 10. PERFORMS_REL
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | FK â†’ EMPLOYEE |
| part_id | INT | FK â†’ PART |
| role_type | VARCHAR(50) | NOT NULL |
| *(emp_id, part_id)* | â€” | COMPOSITE PK |

#### 11. SHOP
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| shop_id | INT | PRIMARY KEY |
| location | VARCHAR(100) | NOT NULL |

#### 12. INVENTORY
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| shop_id | INT | FK â†’ SHOP |
| product_id | INT | FK â†’ PRODUCT |
| stock_quantity | INT | NOT NULL |
| last_updated | DATE | NOT NULL |
| *(shop_id, product_id)* | â€” | COMPOSITE PK |

---

### Table Set 3: Sales & Orders

#### 13. BUYER
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| buyer_id | INT | PRIMARY KEY |
| company_name | VARCHAR(100) | NOT NULL |
| gst_no | VARCHAR(20) | UNIQUE |
| contact_person | VARCHAR(100) | NOT NULL |

#### 14. PURCHASE_ORDER
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| order_id | INT | PRIMARY KEY |
| order_date | DATE | NOT NULL |
| status | VARCHAR(30) | NOT NULL, DEFAULT 'Pending' |
| buyer_id | INT | FK â†’ BUYER |

#### 15. ORDER_LINE_ITEMS
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| order_id | INT | FK â†’ PURCHASE_ORDER |
| product_id | INT | FK â†’ PRODUCT |
| quantity | INT | NOT NULL |
| agreed_price | DECIMAL(10,2) | NOT NULL |
| *(order_id, product_id)* | â€” | COMPOSITE PK |

#### 16. CONTAINS_ORDER_LINE_ITEMS *(junction)*
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| order_id | INT | FK â†’ PURCHASE_ORDER |
| product_id | INT | FK â†’ PRODUCT |

---

### Table Set 4: Human Resources (Employee Hierarchy)

#### 17. EMPLOYEE
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| dob | DATE | NOT NULL |
| phone | VARCHAR(15) | UNIQUE |
| salary | DECIMAL(10,2) | NOT NULL |
| joining_date | DATE | NOT NULL |
| dept_id | INT | FK â†’ DEPARTMENT |

#### 18. MANAGER
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | PK + FK â†’ EMPLOYEE |
| grade | VARCHAR(10) | NOT NULL |

#### 19. ENGINEER
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | PK + FK â†’ EMPLOYEE |
| role_type | VARCHAR(50) | NOT NULL |

#### 20. TRUCK_DRIVER
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | PK + FK â†’ EMPLOYEE |
| license_type | VARCHAR(20) | NOT NULL |

#### 21. SUPERVISOR
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | PK + FK â†’ EMPLOYEE |
| license_type | VARCHAR(50) | NOT NULL |

#### 22. ACCOUNTANT
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | PK + FK â†’ EMPLOYEE |
| license_type | VARCHAR(50) | NOT NULL |

#### 23. LABOUR
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | PK + FK â†’ EMPLOYEE |
| role_type | VARCHAR(50) | NOT NULL |

#### 24. LAWYER
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id | INT | PK + FK â†’ EMPLOYEE |
| lawyer_spec | VARCHAR(100) | NOT NULL |

---

### Table Set 5: Logistics & Legal

#### 25. VEHICLE
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| vehicle_id | INT | PRIMARY KEY |
| type | VARCHAR(50) | NOT NULL |
| registration_no | VARCHAR(20) | UNIQUE |

#### 26. VEHICLE_ASSIGNMENT
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| vehicle_id | INT | FK â†’ VEHICLE |
| emp_id_driver | INT | FK â†’ TRUCK_DRIVER |
| *(vehicle_id, emp_id_driver)* | â€” | COMPOSITE PK |

#### 27. MAINTENANCE_LOG
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| emp_id_mechanic | INT | FK â†’ EMPLOYEE |
| vehicle_id | INT | FK â†’ VEHICLE |
| service_date | DATE | NOT NULL |
| service_details | TEXT | NOT NULL |
| *(emp_id_mechanic, vehicle_id, service_date)* | â€” | COMPOSITE PK |

#### 28. LEGAL_CASE
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| case_id | INT | PRIMARY KEY |
| case_type | VARCHAR(50) | NOT NULL |
| status | VARCHAR(30) | NOT NULL |

#### 29. CASE_HANDLING
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| case_id | INT | FK â†’ LEGAL_CASE |
| emp_id_lawyer | INT | FK â†’ LAWYER |
| *(case_id, emp_id_lawyer)* | â€” | COMPOSITE PK |

#### 30. CUSTOMS_RECORD
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| record_id | INT | PRIMARY KEY |
| import_export | VARCHAR(10) | CHECK IN ('Import','Export') |
| duty_amount | DECIMAL(10,2) | NOT NULL |

#### 31. CONSULTATION
| Attribute | Data Type | Constraints |
|-----------|-----------|-------------|
| consult_id | INT | PRIMARY KEY |
| type | VARCHAR(50) | NOT NULL |
| fee | DECIMAL(10,2) | NOT NULL |

> **Additional Junction Tables** (visible in MySQL `SHOW TABLES`):
> - `legal_case_associated_with_record`
> - `case_handling_involves_consultation`

# Part 2 â€” SQL Code, Queries, Normalization, Transactions & Frontend/Backend

---

## ðŸ› ï¸ DDL â€” CREATE DATABASE & TABLES

```sql
CREATE DATABASE pbcompany;
USE pbcompany;

-- 1. Company
CREATE TABLE Company (
  company_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  registration_no VARCHAR(50) UNIQUE,
  headquarters VARCHAR(100) NOT NULL,
  established_year INT
);

-- 2. Shareholder
CREATE TABLE Shareholder (
  shareholder_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  contact VARCHAR(50)
);

-- 3. Owns
CREATE TABLE Owns (
  company_id INT,
  shareholder_id INT,
  percentage_owned DECIMAL(5,2) NOT NULL,
  share_type VARCHAR(50),
  PRIMARY KEY (company_id, shareholder_id),
  FOREIGN KEY (company_id) REFERENCES Company(company_id),
  FOREIGN KEY (shareholder_id) REFERENCES Shareholder(shareholder_id)
);

-- 4. Department
CREATE TABLE Department (
  dept_id INT PRIMARY KEY,
  dept_name VARCHAR(100) NOT NULL,
  location VARCHAR(100)
);

-- 5. Product
CREATE TABLE Product (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  cost_price DECIMAL(10,2) NOT NULL,
  selling_price DECIMAL(10,2) NOT NULL
);

-- 6. Part
CREATE TABLE Part (
  part_id INT PRIMARY KEY,
  part_name VARCHAR(100) NOT NULL,
  specification TEXT
);

-- 7. Production_Unit
CREATE TABLE Production_Unit (
  unit_id INT PRIMARY KEY,
  unit_name VARCHAR(100) NOT NULL,
  location VARCHAR(100)
);

-- 8. Shop
CREATE TABLE Shop (
  shop_id INT PRIMARY KEY,
  location VARCHAR(100) NOT NULL
);

-- 9. Produces_Rel
CREATE TABLE Produces_Rel (
  unit_id INT,
  product_id INT,
  production_date DATE NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (unit_id, product_id, production_date),
  FOREIGN KEY (unit_id) REFERENCES Production_Unit(unit_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

-- 10. Inventory
CREATE TABLE Inventory (
  shop_id INT,
  product_id INT,
  stock_quantity INT NOT NULL,
  last_updated DATETIME,
  PRIMARY KEY (shop_id, product_id),
  FOREIGN KEY (shop_id) REFERENCES Shop(shop_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

-- 11. Buyer
CREATE TABLE Buyer (
  buyer_id INT PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL,
  gst_no VARCHAR(20) UNIQUE,
  contact_person VARCHAR(100) NOT NULL
);

-- 12. Purchase_Order
CREATE TABLE Purchase_Order (
  order_id INT PRIMARY KEY,
  order_date DATE NOT NULL,
  status VARCHAR(30) NOT NULL,
  buyer_id INT,
  FOREIGN KEY (buyer_id) REFERENCES Buyer(buyer_id)
);

-- 13. Order_Line_Items
CREATE TABLE Order_Line_Items (
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  agreed_price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES Purchase_Order(order_id),
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

-- 14. Employee
CREATE TABLE Employee (
  emp_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  dob DATE,
  phone VARCHAR(15),
  salary DECIMAL(10,2),
  joining_date DATE,
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
);

-- 15. Manager
CREATE TABLE Manager (
  emp_id INT PRIMARY KEY,
  grade VARCHAR(10),
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- 16. Engineer
CREATE TABLE Engineer (
  emp_id INT PRIMARY KEY,
  role_type VARCHAR(50),
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- 17. Truck_Driver
CREATE TABLE Truck_Driver (
  emp_id INT PRIMARY KEY,
  license_type VARCHAR(20),
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- 18. Labour
CREATE TABLE Labour (
  emp_id INT PRIMARY KEY,
  role_type VARCHAR(50),
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- 19. Supervisor
CREATE TABLE Supervisor (
  emp_id INT PRIMARY KEY,
  license_type VARCHAR(50),
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- 20. Accountant
CREATE TABLE Accountant (
  emp_id INT PRIMARY KEY,
  license_type VARCHAR(50),
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- 21. Lawyer
CREATE TABLE Lawyer (
  emp_id INT PRIMARY KEY,
  lawyer_spec VARCHAR(100),
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- 22. Performs_Rel
CREATE TABLE Performs_Rel (
  emp_id INT,
  part_id INT,
  role_type VARCHAR(50),
  PRIMARY KEY (emp_id, part_id),
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id),
  FOREIGN KEY (part_id) REFERENCES Part(part_id)
);

-- 23. Vehicle
CREATE TABLE Vehicle (
  vehicle_id INT PRIMARY KEY,
  type VARCHAR(50),
  registration_no VARCHAR(20) UNIQUE
);

-- 24. Vehicle_Assignment
CREATE TABLE Vehicle_Assignment (
  vehicle_id INT,
  emp_id_driver INT,
  PRIMARY KEY (vehicle_id, emp_id_driver),
  FOREIGN KEY (vehicle_id) REFERENCES Vehicle(vehicle_id),
  FOREIGN KEY (emp_id_driver) REFERENCES Truck_Driver(emp_id)
);

-- 25. Maintenance_Log
CREATE TABLE Maintenance_Log (
  emp_id_mechanic INT,
  vehicle_id INT,
  service_date DATE NOT NULL,
  service_details TEXT,
  PRIMARY KEY (emp_id_mechanic, vehicle_id, service_date),
  FOREIGN KEY (emp_id_mechanic) REFERENCES Employee(emp_id),
  FOREIGN KEY (vehicle_id) REFERENCES Vehicle(vehicle_id)
);

-- 26. Legal_Case
CREATE TABLE Legal_Case (
  case_id INT PRIMARY KEY,
  case_type VARCHAR(50),
  status VARCHAR(30)
);

-- 27. Case_Handling
CREATE TABLE Case_Handling (
  case_id INT,
  emp_id_lawyer INT,
  PRIMARY KEY (case_id, emp_id_lawyer),
  FOREIGN KEY (case_id) REFERENCES Legal_Case(case_id),
  FOREIGN KEY (emp_id_lawyer) REFERENCES Lawyer(emp_id)
);

-- 28. Customs_Record
CREATE TABLE Customs_Record (
  record_id INT PRIMARY KEY,
  import_export VARCHAR(10) CHECK (import_export IN ('Import','Export')),
  duty_amount DECIMAL(10,2)
);

-- 29. Consultation
CREATE TABLE Consultation (
  consult_id INT PRIMARY KEY,
  type VARCHAR(50),
  fee DECIMAL(10,2)
);
```

---

## ðŸ“¥ DML â€” Sample INSERT Statements

```sql
INSERT INTO Company VALUES (1, 'Apex Industries', 'Public', 'REG123456', 'Mumbai', 1995);
INSERT INTO Shareholder VALUES (101, 'Rahul Sharma', 'Individual', '9876543210');
INSERT INTO Owns VALUES (1, 101, 15.50, 'Equity');

INSERT INTO Department VALUES (10, 'Production', 'Block A');
INSERT INTO Department VALUES (20, 'Logistics', 'Block B');
INSERT INTO Department VALUES (30, 'Legal', 'Head Office');
INSERT INTO Department VALUES (40, 'Finance', 'Head Office');

INSERT INTO Product VALUES (501, 'Industrial Pump', 'Machinery', 15000.00, 25000.00);
INSERT INTO Part VALUES (1001, 'Steel Valve', 'Stainless Steel 304');
INSERT INTO Production_Unit VALUES (1, 'Assembly Line 1', 'Factory Floor 1');
INSERT INTO Shop VALUES (1, 'Warehouse North');
INSERT INTO Produces_Rel VALUES (1, 501, '2025-10-01', 50);
INSERT INTO Inventory VALUES (1, 501, 120, '2025-10-05 10:00:00');

INSERT INTO Buyer VALUES (201, 'BuildWell Const.', '27ABCDE1234F1Z5', 'Vikram Singh');
INSERT INTO Purchase_Order VALUES (5001, '2025-11-01', 'Pending', 201);
INSERT INTO Order_Line_Items VALUES (5001, 501, 10, 24500.00);

INSERT INTO Employee VALUES (1, 'Amit Verma', '1985-06-15', '9988776655', 80000.00, '2015-01-10', 10);
INSERT INTO Employee VALUES (2, 'Suresh Kumar', '1990-08-20', '8877665544', 40000.00, '2018-05-20', 10);
INSERT INTO Employee VALUES (3, 'Ramesh Yadav', '1992-02-10', '7766554433', 25000.00, '2019-03-15', 20);
INSERT INTO Employee VALUES (4, 'Priya Das', '1995-11-05', '6655443322', 90000.00, '2020-07-01', 30);
INSERT INTO Employee VALUES (5, 'John Smith', '1988-12-12', '5544332211', 15000.00, '2017-09-10', 10);
INSERT INTO Employee VALUES (6, 'Anita Roy', '1993-04-22', '4433221100', 35000.00, '2021-02-10', 10);
INSERT INTO Employee VALUES (7, 'Karan Johar', '1989-01-30', '3322110099', 45000.00, '2016-11-12', 40);

INSERT INTO Manager VALUES (1, 'A1');
INSERT INTO Engineer VALUES (2, 'Mechanical');
INSERT INTO Truck_Driver VALUES (3, 'Heavy Vehicle');
INSERT INTO Labour VALUES (5, 'Assembly');
INSERT INTO Supervisor VALUES (6, 'Shop Floor License');
INSERT INTO Accountant VALUES (7, 'CPA');
INSERT INTO Lawyer VALUES (4, 'Corporate Law');
INSERT INTO Performs_Rel VALUES (5, 1001, 'Machining');

INSERT INTO Vehicle VALUES (10, 'Truck', 'MH-01-AB-1234');
INSERT INTO Vehicle_Assignment VALUES (10, 3);
INSERT INTO Maintenance_Log VALUES (2, 10, '2025-09-15', 'Oil Change');
INSERT INTO Legal_Case VALUES (100, 'Patent Dispute', 'Ongoing');
INSERT INTO Case_Handling VALUES (100, 4);
INSERT INTO Customs_Record VALUES (1, 'Export', 5000.00);
INSERT INTO Consultation VALUES (1, 'Tax Audit', 15000.00);
```

---

## ðŸ“Š Complex SQL Queries

### Constraints
```sql
-- CHECK: selling_price > cost_price
ALTER TABLE PRODUCT ADD CONSTRAINT chk_price CHECK (selling_price > cost_price);

-- DEFAULT: status defaults to 'Pending'
ALTER TABLE PURCHASE_ORDER ALTER COLUMN status SET DEFAULT 'Pending';

-- UNIQUE: vehicle registration
ALTER TABLE VEHICLE ADD CONSTRAINT uq_reg_no UNIQUE (registration_no);
```

### Aggregate Functions
```sql
-- Avg/Max/Min prices by category
SELECT category, ROUND(AVG(selling_price),2) AS Avg_SP, MAX(selling_price) AS Max_SP, MIN(cost_price) AS Min_CP
FROM PRODUCT GROUP BY category;

-- Employee count per department (>2)
SELECT d.dept_name, COUNT(e.emp_id) AS Total
FROM DEPARTMENT d JOIN EMPLOYEE e ON d.dept_id = e.dept_id
GROUP BY d.dept_name HAVING COUNT(e.emp_id) > 2 ORDER BY Total DESC;

-- Total order value per product
SELECT p.product_name, SUM(oli.quantity) AS Qty, SUM(oli.quantity * oli.agreed_price) AS Value
FROM PRODUCT p JOIN ORDER_LINE_ITEMS oli ON p.product_id = oli.product_id
GROUP BY p.product_name ORDER BY Value DESC;
```

### Set Operations
```sql
-- UNION: active + serviced vehicles
SELECT vehicle_id, type, registration_no, 'Active' AS source FROM VEHICLE
UNION
SELECT v.vehicle_id, v.type, v.registration_no, 'Serviced' FROM VEHICLE v
JOIN MAINTENANCE_LOG ml ON v.vehicle_id = ml.vehicle_id;

-- INTERSECT: employees in departments with production units
SELECT DISTINCT e.emp_id, e.name FROM EMPLOYEE e WHERE e.dept_id IN (SELECT dept_id FROM DEPARTMENT)
INTERSECT
SELECT DISTINCT e.emp_id, e.name FROM EMPLOYEE e
JOIN DEPARTMENT d ON e.dept_id = d.dept_id JOIN PRODUCTION_UNIT pu ON d.dept_id = pu.unit_id;
```

### Subqueries
```sql
-- Salary > average
SELECT name, salary, dept_id FROM EMPLOYEE WHERE salary > (SELECT AVG(salary) FROM EMPLOYEE) ORDER BY salary DESC;

-- Products never ordered
SELECT product_id, product_name, category FROM PRODUCT
WHERE product_id NOT IN (SELECT DISTINCT product_id FROM ORDER_LINE_ITEMS);

-- Highest value buyer (correlated)
SELECT b.buyer_id, b.company_name,
  (SELECT SUM(oli.quantity * oli.agreed_price) FROM PURCHASE_ORDER po
   JOIN ORDER_LINE_ITEMS oli ON po.order_id = oli.order_id
   WHERE po.buyer_id = b.buyer_id) AS Total_Value
FROM BUYER b ORDER BY Total_Value DESC LIMIT 1;
```

### Views
```sql
-- Purchase summary view
CREATE VIEW Purchase_Summary_View AS
SELECT b.company_name AS Buyer, po.order_id, po.order_date, p.product_name,
  oli.quantity, (oli.quantity * oli.agreed_price) AS Total_Value
FROM BUYER b JOIN PURCHASE_ORDER po ON b.buyer_id = po.buyer_id
JOIN ORDER_LINE_ITEMS oli ON po.order_id = oli.order_id
JOIN PRODUCT p ON oli.product_id = p.product_id;

-- Truck driver assignment view
CREATE VIEW TruckDriver_Assignment_View AS
SELECT e.emp_id, e.name AS Driver_Name, v.vehicle_id, v.type, v.registration_no
FROM EMPLOYEE e JOIN VEHICLE_ASSIGNMENT va ON e.emp_id = va.emp_id_driver
JOIN VEHICLE v ON va.vehicle_id = v.vehicle_id WHERE v.type = 'Truck';

-- Legal + customs view
CREATE VIEW Legal_Customs_View AS
SELECT e.name AS Lawyer_Name, lc.case_id, lc.case_type, lc.status,
  cr.record_id, cr.import_export, cr.duty_amount
FROM EMPLOYEE e JOIN CASE_HANDLING ch ON e.emp_id = ch.emp_id_lawyer
JOIN LEGAL_CASE lc ON ch.case_id = lc.case_id
JOIN CUSTOMS_RECORD cr ON lc.case_id = cr.record_id;
```

### Triggers
```sql
-- BEFORE INSERT: check stock before order
DELIMITER //
CREATE TRIGGER trg_check_stock_before_order BEFORE INSERT ON ORDER_LINE_ITEMS
FOR EACH ROW
BEGIN
  DECLARE avail_stock INT;
  SELECT stock_quantity INTO avail_stock FROM INVENTORY WHERE product_id = NEW.product_id LIMIT 1;
  IF avail_stock IS NULL OR avail_stock < NEW.quantity THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient stock for this order.';
  END IF;
END //
DELIMITER ;

-- AFTER INSERT: reduce inventory
DELIMITER //
CREATE TRIGGER trg_reduce_inventory_after_order AFTER INSERT ON ORDER_LINE_ITEMS
FOR EACH ROW
BEGIN
  UPDATE INVENTORY SET stock_quantity = stock_quantity - NEW.quantity, last_updated = NOW()
  WHERE product_id = NEW.product_id;
END //
DELIMITER ;

-- AFTER UPDATE: maintenance audit log
CREATE TABLE Maintenance_Audit (
  audit_id INT AUTO_INCREMENT PRIMARY KEY, vehicle_id VARCHAR(10),
  old_details VARCHAR(255), new_details VARCHAR(255), updated_at DATETIME
);
DELIMITER //
CREATE TRIGGER trg_maintenance_audit AFTER UPDATE ON MAINTENANCE_LOG
FOR EACH ROW
BEGIN
  IF OLD.service_details <> NEW.service_details THEN
    INSERT INTO Maintenance_Audit (vehicle_id, old_details, new_details, updated_at)
    VALUES (NEW.vehicle_id, OLD.service_details, NEW.service_details, NOW());
  END IF;
END //
DELIMITER ;
```

### Cursors (Stored Procedures)
```sql
-- Employee performance labeling
DELIMITER //
CREATE PROCEDURE proc_employee_performance()
BEGIN
  DECLARE done INT DEFAULT 0; DECLARE v_name VARCHAR(50);
  DECLARE v_salary DECIMAL(10,2); DECLARE v_label VARCHAR(20);
  DECLARE cur_emp CURSOR FOR SELECT name, salary FROM EMPLOYEE ORDER BY salary DESC;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
  OPEN cur_emp;
  emp_loop: LOOP
    FETCH cur_emp INTO v_name, v_salary;
    IF done THEN LEAVE emp_loop; END IF;
    SET v_label = IF(v_salary > 70000, 'High Performer', 'Standard');
    SELECT v_name AS Employee, v_salary AS Salary, v_label AS Performance;
  END LOOP;
  CLOSE cur_emp;
END //
DELIMITER ;

-- Reprice low-stock products (+10%)
DELIMITER //
CREATE PROCEDURE proc_reprice_low_stock()
BEGIN
  DECLARE done INT DEFAULT 0; DECLARE v_prod_id VARCHAR(10); DECLARE v_stock INT;
  DECLARE cur_inv CURSOR FOR SELECT product_id, stock_quantity FROM INVENTORY;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
  OPEN cur_inv;
  inv_loop: LOOP
    FETCH cur_inv INTO v_prod_id, v_stock;
    IF done THEN LEAVE inv_loop; END IF;
    IF v_stock < 100 THEN
      UPDATE PRODUCT SET selling_price = ROUND(selling_price * 1.10, 2) WHERE product_id = v_prod_id;
    END IF;
  END LOOP;
  CLOSE cur_inv;
END //
DELIMITER ;

-- Generate order summary
CREATE TABLE Order_Summary (
  summary_id INT AUTO_INCREMENT PRIMARY KEY, buyer_name VARCHAR(100),
  order_id VARCHAR(20), total_items INT, total_value DECIMAL(15,2)
);
DELIMITER //
CREATE PROCEDURE proc_generate_order_summary()
BEGIN
  DECLARE done INT DEFAULT 0; DECLARE v_order_id VARCHAR(20);
  DECLARE v_buyer VARCHAR(100); DECLARE v_items INT; DECLARE v_value DECIMAL(15,2);
  DECLARE cur_orders CURSOR FOR
    SELECT po.order_id, b.company_name, COUNT(oli.product_id), SUM(oli.quantity * oli.agreed_price)
    FROM PURCHASE_ORDER po JOIN BUYER b ON po.buyer_id = b.buyer_id
    JOIN ORDER_LINE_ITEMS oli ON po.order_id = oli.order_id GROUP BY po.order_id, b.company_name;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
  OPEN cur_orders;
  ord_loop: LOOP
    FETCH cur_orders INTO v_order_id, v_buyer, v_items, v_value;
    IF done THEN LEAVE ord_loop; END IF;
    INSERT INTO Order_Summary (buyer_name, order_id, total_items, total_value) VALUES (v_buyer, v_order_id, v_items, v_value);
  END LOOP;
  CLOSE cur_orders;
END //
DELIMITER ;
```

---

## ðŸ“ Normalization Summary

| Normal Form | Issue Addressed | Example Transformation |
|-------------|----------------|----------------------|
| **1NF** | Non-atomic `product_list` in orders | Split into `PURCHASE_ORDER` + `ORDER_LINE_ITEMS` |
| **2NF** | Partial dependency on composite key | Separate `PRODUCT(product_name, category)` from `ORDER_LINE_ITEMS` |
| **3NF** | Transitive: `emp_id â†’ dept_id â†’ dept_name` | Separate `DEPARTMENT(dept_id, dept_name, location)` from `EMPLOYEE` |
| **BCNF** | Non-candidate-key determinant | `VEHICLE_ASSIGNMENT` decomposed with `VEHICLE` and `EMPLOYEE` |
| **4NF** | Multi-valued: `emp_id â†’â†’ skill`, `emp_id â†’â†’ project` | Split into `EMPLOYEE_SKILL` + `EMPLOYEE_PROJECT` |
| **5NF** | Join dependency in supplier-product-project | Split into 3 binary tables |

---

## ðŸ”’ Transactions & Concurrency Control

### 5 Transactions

| # | Purpose | Key Operations | TCL Used |
|---|---------|---------------|----------|
| T1 | Complete Order Processing | INSERT order + items, UPDATE inventory | SAVEPOINT, COMMIT |
| T2 | Inventory Error Handling | UPDATE stock, rollback bad update | SAVEPOINT, ROLLBACK TO, COMMIT |
| T3 | Employee Salary Update | UPDATE salary for 2 employees | SAVEPOINT, COMMIT |
| T4 | Vehicle Assignment | INSERT assignment, UPDATE vehicle type | SAVEPOINT, COMMIT |
| T5 | Order Cancellation | DELETE items, partial rollback keeps order | SAVEPOINT, ROLLBACK TO, COMMIT |

### Concurrency Control
- **Row-Level Locking**: `SELECT ... FOR UPDATE`
- **Table-Level Locking**: `LOCK TABLE ... IN EXCLUSIVE MODE`
- **Lock Modes**: ROW SHARE, ROW EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE
- **ACID Properties**: Atomicity, Consistency, Isolation, Durability enforced

---

## ðŸ–¥ï¸ Frontend Design Specification

### Technology Stack
| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js (Express) OR Python (Flask) |
| Database | MySQL 8.0 |
| Connector | `mysql2` (Node.js) or `mysql-connector-python` |

### Recommended Pages / Modules

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Overview: company stats, employee count, order summary |
| Company | `/company` | View/edit company details, shareholders |
| Departments | `/departments` | List departments, employee count per dept |
| Employees | `/employees` | CRUD with role sub-type (Manager/Engineer/etc.) |
| Products | `/products` | Product catalog with cost/sell prices |
| Inventory | `/inventory` | Stock levels per shop, low-stock alerts |
| Orders | `/orders` | Purchase orders, line items, buyer info |
| Buyers | `/buyers` | B2B buyer management |
| Vehicles | `/vehicles` | Fleet management, assignments, maintenance logs |
| Legal | `/legal` | Legal cases, lawyer assignments, customs |
| Reports | `/reports` | Aggregate views, summaries, analytics |

### UI Component Breakdown

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  SIDEBAR NAV           â”‚   MAIN CONTENT     â”‚
â”‚  â”€â”€â”€â”€â”€â”€â”€â”€â”€             â”‚   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€    â”‚
â”‚  Dashboard             â”‚   [Stat Cards]     â”‚
â”‚  Company               â”‚   [Data Table]     â”‚
â”‚  Departments           â”‚   [Charts]         â”‚
â”‚  Employees             â”‚   [CRUD Forms]     â”‚
â”‚  Products              â”‚                    â”‚
â”‚  Inventory             â”‚                    â”‚
â”‚  Orders                â”‚                    â”‚
â”‚  Buyers                â”‚                    â”‚
â”‚  Vehicles              â”‚                    â”‚
â”‚  Legal                 â”‚                    â”‚
â”‚  Reports               â”‚                    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## âš™ï¸ Backend Setup (Node.js + Express + MySQL)

### Project Structure
```
pbcompany/
â”œâ”€â”€ server.js              # Express app entry point
â”œâ”€â”€ package.json
â”œâ”€â”€ config/
â”‚   â””â”€â”€ db.js              # MySQL connection pool
â”œâ”€â”€ routes/
â”‚   â”œâ”€â”€ company.js
â”‚   â”œâ”€â”€ departments.js
â”‚   â”œâ”€â”€ employees.js
â”‚   â”œâ”€â”€ products.js
â”‚   â”œâ”€â”€ inventory.js
â”‚   â”œâ”€â”€ orders.js
â”‚   â”œâ”€â”€ buyers.js
â”‚   â”œâ”€â”€ vehicles.js
â”‚   â””â”€â”€ legal.js
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ index.html
â”‚   â”œâ”€â”€ css/style.css
â”‚   â””â”€â”€ js/app.js
â””â”€â”€ sql/
    â”œâ”€â”€ schema.sql          # All CREATE TABLE statements
    â””â”€â”€ seed.sql            # All INSERT statements
```

### Database Connection (`config/db.js`)
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'pbcompany',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
```

### Express Server (`server.js`)
```javascript
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/company', require('./routes/company'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/products', require('./routes/products'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/buyers', require('./routes/buyers'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/legal', require('./routes/legal'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

### Example Route (`routes/employees.js`)
```javascript
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all employees with department name
router.get('/', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT e.*, d.dept_name FROM Employee e
    LEFT JOIN Department d ON e.dept_id = d.dept_id ORDER BY e.emp_id
  `);
  res.json(rows);
});

// GET single employee
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM Employee WHERE emp_id = ?', [req.params.id]);
  res.json(rows[0] || {});
});

// POST new employee
router.post('/', async (req, res) => {
  const { emp_id, name, dob, phone, salary, joining_date, dept_id } = req.body;
  await pool.query('INSERT INTO Employee VALUES (?,?,?,?,?,?,?)',
    [emp_id, name, dob, phone, salary, joining_date, dept_id]);
  res.json({ success: true });
});

// PUT update employee
router.put('/:id', async (req, res) => {
  const { name, phone, salary, dept_id } = req.body;
  await pool.query('UPDATE Employee SET name=?, phone=?, salary=?, dept_id=? WHERE emp_id=?',
    [name, phone, salary, dept_id, req.params.id]);
  res.json({ success: true });
});

// DELETE employee
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM Employee WHERE emp_id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
```

### API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company` | Get company details |
| GET | `/api/departments` | List all departments |
| GET/POST/PUT/DELETE | `/api/employees` | Full CRUD for employees |
| GET/POST/PUT/DELETE | `/api/products` | Full CRUD for products |
| GET | `/api/inventory` | Get stock levels |
| GET/POST | `/api/orders` | Get/create purchase orders |
| GET/POST | `/api/buyers` | Get/create B2B buyers |
| GET | `/api/vehicles` | Get fleet + assignments |
| GET | `/api/legal` | Get legal cases + customs |

---

## ðŸš€ Quick Start Guide

```bash
# 1. Install MySQL and create database
mysql -u root -p < sql/schema.sql
mysql -u root -p < sql/seed.sql

# 2. Initialize Node.js project
npm init -y
npm install express mysql2

# 3. Start server
node server.js

# 4. Open browser
# http://localhost:3000
```

---

## ðŸ“š References

- Elmasri & Navathe â€” Fundamentals of Database Systems
- MySQL 8.0 Reference Manual
- Express.js Official Documentation
- W3Schools SQL Tutorial
