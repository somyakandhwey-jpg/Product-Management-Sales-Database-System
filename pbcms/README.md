# 🏭 PBCMS — Product-Based Company Management System

> **A full-stack enterprise management dashboard for Apex Industries Pvt. Ltd.**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript\&logoColor=black)
![License](https://img.shields.io/badge/License-Academic-blue)

---

## 📌 Overview

**PBCMS (Product-Based Company Management System)** is a full-stack enterprise management application designed to simulate the operations of a product-based manufacturing company.

The system provides **role-based dashboards** for managing:

* 👥 Employees and departments
* 🏭 Production and manufacturing
* 📦 Inventory and stock
* 💰 Finance and orders
* ⚖️ Legal cases and compliance
* 🚚 Logistics and fleet
* 🛒 B2B buyers
* 📈 Shareholders and ownership

The project demonstrates practical **Database Management System concepts** through a normalized relational database, multiple entity relationships, CRUD operations, analytics queries, authentication, and role-based access control.

---

## ✨ Key Features

### 🔐 Authentication & Access Control

* Session-based authentication
* Password hashing with `bcryptjs`
* Role-based access control
* Protected API routes
* Login and logout functionality

### 👥 Role-Based Dashboards

The system supports **9 different user roles**, with each role receiving a customized dashboard and relevant functionality.

### 📊 Analytics

* KPI cards
* Revenue statistics
* Production analytics
* Employee statistics
* Inventory insights
* Order summaries
* Fleet analytics
* Legal case statistics

### 🗃️ Database Operations

* Full CRUD functionality
* Relational database design
* Primary and foreign keys
* Many-to-many relationships
* Referential integrity
* Seed/demo data
* SQL joins and aggregate queries

### 🎨 Modern Interface

* Dark-mode UI
* Glassmorphism design
* Responsive sidebar
* Animated KPI counters
* Particle animation
* Toast notifications
* Dynamic modal forms
* Status indicators

---

## 🏢 Business Modules

| Module             | Description                                            |
| ------------------ | ------------------------------------------------------ |
| 🏢 **Company**     | Company information, shareholders and ownership        |
| 👥 **HR**          | Employee and department management                     |
| 🏭 **Production**  | Products, parts, production units and work assignments |
| 📦 **Inventory**   | Shops, stock levels and inventory management           |
| 💰 **Finance**     | Orders, revenue, customs duties and consultations      |
| ⚖️ **Legal**       | Legal cases, lawyers and customs records               |
| 🚚 **Logistics**   | Vehicles, drivers and maintenance                      |
| 🛒 **B2B Buyer**   | Product browsing and order management                  |
| 📈 **Shareholder** | Company information and ownership distribution         |

---

# 🛠️ Tech Stack

| Layer               | Technology                    |
| ------------------- | ----------------------------- |
| **Runtime**         | Node.js 18+                   |
| **Backend**         | Express.js 4.18               |
| **Database**        | MySQL 8.0                     |
| **Database Driver** | mysql2/promise                |
| **Authentication**  | express-session + bcryptjs    |
| **Frontend**        | HTML5, CSS3, JavaScript ES6+  |
| **Typography**      | Google Fonts — Inter          |
| **UI**              | CSS Glassmorphism             |
| **Architecture**    | REST API + SPA-style frontend |

> **No build tools required.** Run the application directly with `npm start`.

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────┐
│                     BROWSER                         │
│                                                     │
│  login.html     dashboard.html       app.js        │
│  Authentication     SPA Shell       Router/UI      │
└───────────────────────┬─────────────────────────────┘
                        │
                    HTTP / JSON
                        │
┌───────────────────────▼─────────────────────────────┐
│                  EXPRESS.JS SERVER                  │
│                                                     │
│  Authentication     Sessions     Static Files      │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │                 API ROUTES                    │  │
│  │                                               │  │
│  │ Auth · Dashboard · Company · HR · Production  │  │
│  │ Inventory · Orders · Buyers · Vehicles · Legal│  │
│  └───────────────────────┬───────────────────────┘  │
└──────────────────────────┼──────────────────────────┘
                           │
                       mysql2
                           │
┌──────────────────────────▼──────────────────────────┐
│                    MYSQL DATABASE                   │
│                                                     │
│       pbcompany · Tables · Relationships            │
│       Foreign Keys · Constraints · Seed Data       │
└─────────────────────────────────────────────────────┘
```

---

# 🗄️ Database Design

The `pbcompany` database contains the relational data model used to represent the company's operations.

## Core Entities

| Table             | Primary Key      | Purpose                    |
| ----------------- | ---------------- | -------------------------- |
| `users`           | `id`             | Application login accounts |
| `company`         | `company_id`     | Company information        |
| `shareholder`     | `shareholder_id` | Shareholder records        |
| `department`      | `dept_id`        | Departments                |
| `employee`        | `emp_id`         | Employee records           |
| `product`         | `product_id`     | Product catalog            |
| `part`            | `part_id`        | Manufacturing parts        |
| `production_unit` | `unit_id`        | Production units           |
| `shop`            | `shop_id`        | Shops and warehouses       |
| `buyer`           | `buyer_id`       | B2B buyers                 |
| `purchase_order`  | `order_id`       | Customer orders            |
| `vehicle`         | `vehicle_id`     | Company vehicles           |
| `legal_case`      | `case_id`        | Legal proceedings          |
| `customs_record`  | `record_id`      | Import/export records      |
| `consultation`    | `consult_id`     | Consultation records       |

---

## 👤 Employee Specialization

The database uses an **ISA hierarchy** to represent specialized employee roles.

```text
                     Employee
                        │
        ┌───────────────┼───────────────┐
        │               │               │
     Manager         Engineer         Lawyer
        │
   ┌────┼─────┬────────┬─────────┐
   │    │     │        │         │
 Labour Supervisor Accountant Truck Driver
```

---

## 🔗 Relationship Tables

| Table                                 | Relationship                | Type |
| ------------------------------------- | --------------------------- | ---- |
| `owns`                                | Company ↔ Shareholder       | M:N  |
| `produces_rel`                        | Production Unit ↔ Product   | M:N  |
| `inventory`                           | Shop ↔ Product              | M:N  |
| `order_line_items`                    | Order ↔ Product             | M:N  |
| `performs_rel`                        | Employee ↔ Part             | M:N  |
| `vehicle_assignment`                  | Vehicle ↔ Driver            | M:N  |
| `maintenance_log`                     | Employee ↔ Vehicle          | M:N  |
| `case_handling`                       | Legal Case ↔ Lawyer         | M:N  |
| `department_has_employees`            | Department ↔ Employee       | M:N  |
| `legal_case_associated_with_record`   | Legal Case ↔ Customs Record | M:N  |
| `case_handling_involves_consultation` | Legal Case ↔ Consultation   | M:N  |

---

# 🧠 DBMS Concepts Demonstrated

| Concept                   | Implementation                         |
| ------------------------- | -------------------------------------- |
| **Normalization**         | Structured relational tables           |
| **Primary Keys**          | Unique entity identification           |
| **Foreign Keys**          | Table relationships                    |
| **Referential Integrity** | `CASCADE` / `SET NULL`                 |
| **ISA Hierarchy**         | Employee specialization                |
| **M:N Relationships**     | Bridge tables                          |
| **Aggregate Functions**   | `SUM`, `COUNT`, `AVG`                  |
| **Complex JOINs**         | Multi-table queries                    |
| **Subqueries**            | Nested SQL queries                     |
| **Constraints**           | `CHECK`, `UNIQUE`, FK constraints      |
| **Transactions**          | Atomic database operations             |
| **Indexing**              | Primary and unique indexes             |
| **CRUD**                  | Create, Read, Update/Delete operations |

---

# 🚀 Getting Started

## Prerequisites

Install the following:

* **Node.js 18+**
* **npm 9+**
* **MySQL 8.0+**

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/pbcms.git
cd pbcms
```

Replace `YOUR_USERNAME/pbcms` with your actual GitHub repository URL.

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure MySQL

Open:

```text
config/db.js
```

Update your MySQL credentials:

```javascript
const tmpConn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_MYSQL_PASSWORD',
    multipleStatements: true
});
```

Configure the same credentials for the connection pool.

> ⚠️ **Never commit real passwords, API keys, or secrets to GitHub.**

---

## 4. Start the Application

```bash
npm start
```

The application initializes the database and starts the Express server.

```text
Database initialized with schema + seed data
PBCMS running at http://localhost:3000
```

---

## 5. Open the Application

Visit:

```text
http://localhost:3000
```

Then log in using one of the demo accounts.

---

# 🔑 Role-Based Access

| Role                  | Username      | Access                         |
| --------------------- | ------------- | ------------------------------ |
| **Super Admin**       | `admin`       | Complete system access         |
| **HR Manager**        | `hr_manager`  | Employees and departments      |
| **Production Head**   | `prod_head`   | Products and production        |
| **Inventory Manager** | `inv_manager` | Inventory and shops            |
| **Finance Head**      | `fin_head`    | Orders and financial analytics |
| **Legal Head**        | `legal_head`  | Legal and customs              |
| **Logistics Manager** | `log_manager` | Vehicles and maintenance       |
| **B2B Buyer**         | `buyer_user`  | Products and orders            |
| **Shareholder**       | `share_user`  | Company and ownership          |

### Demo Password

```text
password123
```

> These credentials are provided for local/demo purposes.

---

# 📡 API Reference

**Base URL**

```text
http://localhost:3000
```

## Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| `POST` | `/api/auth/login`  | Authenticate user |
| `POST` | `/api/auth/logout` | Destroy session   |
| `GET`  | `/api/auth/me`     | Get current user  |

### Example Login Request

```json
{
  "username": "admin",
  "password": "password123"
}
```

---

## Dashboard APIs

| Method | Endpoint                     |
| ------ | ---------------------------- |
| `GET`  | `/api/dashboard/admin`       |
| `GET`  | `/api/dashboard/hr`          |
| `GET`  | `/api/dashboard/production`  |
| `GET`  | `/api/dashboard/inventory`   |
| `GET`  | `/api/dashboard/finance`     |
| `GET`  | `/api/dashboard/legal`       |
| `GET`  | `/api/dashboard/logistics`   |
| `GET`  | `/api/dashboard/buyer`       |
| `GET`  | `/api/dashboard/shareholder` |

---

## CRUD APIs

| Endpoint           | Operations          | Purpose                |
| ------------------ | ------------------- | ---------------------- |
| `/api/company`     | GET / POST / DELETE | Company & shareholders |
| `/api/departments` | GET / POST / DELETE | Departments            |
| `/api/employees`   | GET / POST / DELETE | Employees              |
| `/api/products`    | GET / POST / DELETE | Products & production  |
| `/api/inventory`   | GET / POST / DELETE | Inventory              |
| `/api/orders`      | GET / POST / DELETE | Orders                 |
| `/api/buyers`      | GET / POST / DELETE | B2B buyers             |
| `/api/vehicles`    | GET / POST / DELETE | Fleet management       |
| `/api/legal`       | GET / POST / DELETE | Legal & customs        |

---

# 📂 Project Structure

```text
pbcms/
│
├── config/
│   └── db.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── app.js
│
├── login.html
├── dashboard.html
│
├── routes/
│   ├── auth.js
│   ├── dashboard.js
│   ├── company.js
│   ├── departments.js
│   ├── employees.js
│   ├── products.js
│   ├── inventory.js
│   ├── orders.js
│   ├── buyers.js
│   ├── vehicles.js
│   └── legal.js
│
├── sql/
│   ├── schema.sql
│   └── seed.sql
│
├── server.js
├── package.json
└── README.md
```

---

# 🎨 UI & Design

PBCMS features a modern **dark glassmorphism interface** designed for an enterprise dashboard experience.

### Highlights

* 🌑 Dark-mode interface
* ✨ Glassmorphism cards
* 🎨 Modern color palette
* 🌐 Animated particle background
* 📈 Animated KPI counters
* 🔔 Toast notifications
* 🏷️ Status badges
* 📱 Responsive sidebar
* 📝 Dynamic forms
* ⚡ SPA-style navigation

---

# 🔮 Future Improvements

Possible future enhancements include:

* JWT authentication
* Environment-based configuration
* Password reset functionality
* Advanced search and filtering
* CSV/PDF report generation
* Audit logging
* Automated database backups
* Docker deployment
* Cloud database integration
* Enhanced security controls

---

# 📜 License

This project is intended for **educational purposes**.

---

<div align="center">

## 🏭 PBCMS

**Product-Based Company Management System**

Built with ❤️ as a DBMS project

</div>
