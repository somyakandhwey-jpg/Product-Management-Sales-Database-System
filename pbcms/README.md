<![CDATA[<div align="center">

# 🏭 PBCMS — Product-Based Company Management System

**A full-stack enterprise management dashboard for Apex Industries**

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-Academic-blue)

*Built as a DBMS course project — SRM Institute of Science and Technology*

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Role-Based Portals](#-role-based-portals)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Demo Accounts](#-demo-accounts)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 🔍 Overview

PBCMS (Product-Based Company Management System) is a **role-based enterprise dashboard** that models the complete operations of a product-based manufacturing company — **Apex Industries Pvt. Ltd.**

The system covers 9 distinct organizational roles across 31+ relational database tables, managing everything from HR and production to legal compliance and shareholder relations. It demonstrates core DBMS concepts including **normalization, referential integrity, complex joins, aggregation queries, and role-based access control**.

---

## ✨ Features

### Core Capabilities
- 🔐 **Session-based Authentication** with bcrypt password hashing
- 👥 **9 Role-Based Portals** — each with a tailored dashboard and navigation
- 📊 **Real-time Analytics** — KPI cards, bar charts, and data visualizations
- 📋 **Full CRUD Operations** — Add, view, and delete records across all entities
- 🎨 **Premium UI** — Glassmorphism design with particle animations and micro-interactions
- 🔄 **Single-Page Application (SPA)** — Seamless client-side routing without page reloads

### Business Modules
| Module | Description |
|--------|-------------|
| **Company** | Organization profile, shareholder management, ownership tracking |
| **HR** | Employee directory, department management, role specialization tracking |
| **Production** | Production units, parts catalog, production logs, work assignments |
| **Inventory** | Shop/warehouse management, stock levels, low-stock alerts |
| **Finance** | Revenue tracking, purchase orders, customs duties, consultation fees |
| **Legal** | Legal case management, lawyer assignments, customs compliance |
| **Logistics** | Fleet management, driver assignments, vehicle maintenance logs |
| **B2B Buyer** | Product browsing, order placement, order history |
| **Shareholder** | Company information, ownership distribution |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js (v18+) |
| **Backend** | Express.js 4.18 |
| **Database** | MySQL 8.0 (via `mysql2/promise`) |
| **Auth** | `express-session` + `bcryptjs` |
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| **Typography** | Google Fonts — Inter |
| **Design** | Glassmorphism, CSS custom properties, particle canvas |

> **Zero build tools required** — No webpack, no bundler, no transpiler. Just `node server.js`.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  login.html  │  │ dashboard.html│  │  app.js    │ │
│  │  (Auth Page) │  │  (SPA Shell)  │  │ (Router +  │ │
│  └──────┬───────┘  └──────┬───────┘  │  Renderer) │ │
│         │                 │          └─────┬──────┘ │
└─────────┼─────────────────┼────────────────┼────────┘
          │  HTTP / JSON    │                │
┌─────────▼─────────────────▼────────────────▼────────┐
│                  Express.js Server                   │
│  ┌──────────┐  ┌────────────┐  ┌─────────────────┐ │
│  │ Auth MW   │  │ Static MW   │  │ Session MW      │ │
│  └────┬─────┘  └─────┬──────┘  └────────┬────────┘ │
│       │              │                   │          │
│  ┌────▼──────────────▼───────────────────▼────────┐ │
│  │              API Route Handlers                 │ │
│  │  auth · dashboard · company · departments       │ │
│  │  employees · products · inventory · orders      │ │
│  │  buyers · vehicles · legal                      │ │
│  └──────────────────────┬─────────────────────────┘ │
└─────────────────────────┼───────────────────────────┘
                          │  mysql2/promise
┌─────────────────────────▼───────────────────────────┐
│               MySQL Database (pbcompany)             │
│         31 tables · FK constraints · seed data       │
└─────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

The database `pbcompany` contains **31 relational tables + 1 users table**, organized into the following domains:

### Entity Tables
| Table | Primary Key | Description |
|-------|-------------|-------------|
| `users` | `id` | Application login accounts |
| `company` | `company_id` | Organization master record |
| `shareholder` | `shareholder_id` | Individual/institutional shareholders |
| `department` | `dept_id` | Company departments |
| `employee` | `emp_id` | All employee records |
| `product` | `product_id` | Product catalog |
| `part` | `part_id` | Manufacturing parts |
| `production_unit` | `unit_id` | Factory production units |
| `shop` | `shop_id` | Warehouse/retail locations |
| `buyer` | `buyer_id` | B2B buyer companies |
| `purchase_order` | `order_id` | Customer orders |
| `vehicle` | `vehicle_id` | Company fleet |
| `legal_case` | `case_id` | Legal proceedings |
| `customs_record` | `record_id` | Import/export records |
| `consultation` | `consult_id` | External consultancy records |

### Specialization Tables (ISA Hierarchy — Employee)
| Table | Inherits From | Specialization Field |
|-------|--------------|---------------------|
| `manager` | `employee` | `grade` |
| `engineer` | `employee` | `role_type` |
| `truck_driver` | `employee` | `license_type` |
| `labour` | `employee` | `role_type` |
| `supervisor` | `employee` | `license_type` |
| `accountant` | `employee` | `license_type` |
| `lawyer` | `employee` | `lawyer_spec` |

### Relationship Tables
| Table | Connects | Cardinality |
|-------|----------|-------------|
| `owns` | company ↔ shareholder | M:N |
| `produces_rel` | production_unit ↔ product | M:N (with date, qty) |
| `inventory` | shop ↔ product | M:N (stock tracking) |
| `order_line_items` | purchase_order ↔ product | M:N (with price, qty) |
| `performs_rel` | employee ↔ part | M:N (work assignment) |
| `vehicle_assignment` | vehicle ↔ truck_driver | M:N |
| `maintenance_log` | employee ↔ vehicle | M:N (with service date) |
| `case_handling` | legal_case ↔ lawyer | M:N |
| `department_has_employees` | department ↔ employee | M:N |
| `contains_order_line_items` | order ↔ product | M:N |
| `legal_case_associated_with_record` | legal_case ↔ customs_record | M:N |
| `case_handling_involves_consultation` | legal_case ↔ consultation | M:N |

### ER Diagram (Simplified)

```
            ┌───────────────┐
            │    Company    │
            └───────┬───────┘
                    │ owns
            ┌───────▼───────┐
            │  Shareholder  │
            └───────────────┘

  ┌──────────┐          ┌──────────┐
  │Department├──has──────┤ Employee │
  └──────────┘          └────┬─────┘
                             │ ISA
            ┌────────────────┼────────────────┐
       ┌────▼───┐   ┌───────▼──────┐   ┌─────▼────┐
       │Manager │   │  Engineer    │   │ Lawyer   │ ...
       └────────┘   └──────────────┘   └──────────┘

  ┌──────────────┐          ┌─────────┐
  │Prod. Unit    ├─produces─┤ Product │
  └──────────────┘          └────┬────┘
                                 │
              ┌──────────────────┼─────────────┐
        ┌─────▼─────┐    ┌──────▼──────┐ ┌────▼────┐
        │ Inventory  │    │ Order Lines │ │  Part   │
        │ (in Shop)  │    │ (in Order)  │ └─────────┘
        └────────────┘    └─────────────┘

  ┌──────────┐        ┌─────────────┐
  │ Vehicle  ├─maint──┤  Maint. Log │
  └────┬─────┘        └─────────────┘
       │ assigned
  ┌────▼──────┐
  │Truck Driver│
  └───────────┘

  ┌────────────┐       ┌─────────────────┐
  │ Legal Case ├─with──┤ Customs Record  │
  └─────┬──────┘       └─────────────────┘
        │ handled by
  ┌─────▼─────┐        ┌──────────────┐
  │  Lawyer   ├─consult─┤ Consultation │
  └───────────┘        └──────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | v18.0 or higher |
| **MySQL** | 8.0 or higher |
| **npm** | v9+ (bundled with Node.js) |

### 1. Clone & Install

```bash
git clone <repository-url>
cd pbcms
npm install
```

### 2. Configure Database Credentials

Edit `config/db.js` and update the MySQL connection credentials:

```js
// config/db.js
const tmpConn = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_MYSQL_PASSWORD',   // ← Update this
  multipleStatements: true
});
```

> ⚠️ **Important:** Update the password in both the `createConnection` (line 10) and `createPool` (line 19) blocks.

### 3. Start the Server

```bash
npm start
```

This single command will:
1. Connect to MySQL and create the `pbcompany` database (if it doesn't exist)
2. Execute the full schema (`sql/schema.sql`) — 31 tables with FK constraints
3. Seed demo data (`sql/seed.sql`) — company, employees, products, orders, etc.
4. Hash all user passwords with bcrypt
5. Start the Express server on **http://localhost:3000**

```
✅ Database initialized with schema + seed data

🚀 PBCMS running at http://localhost:3000

📋 Login accounts (password: password123):
   admin / hr_manager / prod_head / inv_manager
   fin_head / legal_head / log_manager / buyer_user / share_user
```

### 4. Open in Browser

Navigate to **http://localhost:3000** and log in with any demo account.

---

## 🔑 Role-Based Portals

Each role sees a **customized dashboard, navigation sidebar, and feature set**:

| Role | Username | Portal Access |
|------|----------|--------------|
| **Super Admin** | `admin` | Full access — all modules, all CRUD operations |
| **HR Manager** | `hr_manager` | Employees, departments, salary analytics |
| **Production Head** | `prod_head` | Products, production units, parts, production logs, work assignments |
| **Inventory Manager** | `inv_manager` | Shops, stock levels, products, low-stock alerts |
| **Finance Head** | `fin_head` | Orders, revenue analytics, customs duties, consultations |
| **Legal Head** | `legal_head` | Legal cases, case handling, customs records |
| **Logistics Manager** | `log_manager` | Vehicles, driver assignments, maintenance logs |
| **B2B Buyer** | `buyer_user` | Browse products, orders, stock availability |
| **Shareholder** | `share_user` | Company info, ownership distribution |

> **Default password for all accounts:** `password123`

---

## 📡 API Reference

All endpoints return JSON. Base URL: `http://localhost:3000`

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login with `{ username, password }` |
| `POST` | `/api/auth/logout` | Destroy session |
| `GET` | `/api/auth/me` | Get current authenticated user |

### Dashboard (Analytics)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/admin` | Admin overview KPIs |
| `GET` | `/api/dashboard/hr` | HR analytics (salary, roles) |
| `GET` | `/api/dashboard/production` | Production stats |
| `GET` | `/api/dashboard/inventory` | Stock & shop analytics |
| `GET` | `/api/dashboard/finance` | Revenue, costs, order status |
| `GET` | `/api/dashboard/legal` | Case statistics |
| `GET` | `/api/dashboard/logistics` | Fleet analytics |
| `GET` | `/api/dashboard/buyer` | Buyer order summary |
| `GET` | `/api/dashboard/shareholder` | Company & ownership info |

### CRUD Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET / POST / DELETE` | `/api/company` | Company details & shareholders |
| `GET / POST / DELETE` | `/api/departments` | Department management |
| `GET / POST / DELETE` | `/api/employees` | Employee directory |
| `GET / POST / DELETE` | `/api/products` | Product catalog, units, parts |
| `GET / POST / DELETE` | `/api/inventory` | Stock levels & shops |
| `GET / POST / DELETE` | `/api/orders` | Purchase orders & line items |
| `GET / POST / DELETE` | `/api/buyers` | B2B buyer management |
| `GET / POST / DELETE` | `/api/vehicles` | Fleet, assignments, maintenance |
| `GET / POST / DELETE` | `/api/legal` | Cases, customs, consultations |

---

## 📂 Project Structure

```
pbcms/
├── config/
│   └── db.js                 # MySQL connection pool & database initialization
├── public/
│   ├── css/
│   │   └── style.css         # Full design system (glassmorphism, animations)
│   ├── js/
│   │   └── app.js            # SPA core — routing, rendering, CRUD, modals
│   ├── login.html            # Authentication page with particle canvas
│   └── dashboard.html        # SPA shell — sidebar, topbar, content area
├── routes/
│   ├── auth.js               # Login / logout / session endpoints
│   ├── dashboard.js          # Analytics queries for all 9 role dashboards
│   ├── company.js            # Company & shareholder CRUD
│   ├── departments.js        # Department CRUD
│   ├── employees.js          # Employee CRUD with role joins
│   ├── products.js           # Products, parts, units, production log CRUD
│   ├── inventory.js          # Inventory & shop CRUD
│   ├── orders.js             # Purchase orders & line items CRUD
│   ├── buyers.js             # Buyer CRUD
│   ├── vehicles.js           # Vehicle, assignment, maintenance CRUD
│   └── legal.js              # Cases, customs, consultations, handling CRUD
├── sql/
│   ├── schema.sql            # Full database schema — 31 tables + users
│   └── seed.sql              # Demo data — company, employees, orders, etc.
├── server.js                 # Express app entry point & bootstrapper
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

---

## 🎨 UI Design

The interface uses a **dark-mode glassmorphism** design language:

- **Color Palette:** Deep navy (`#0A1628`), gold accents (`#C9A84C`), and blue primary (`#185FA5`)
- **Glassmorphism Cards:** Semi-transparent backgrounds with `backdrop-filter: blur(20px)`
- **Particle Canvas:** Animated network graph on the login page
- **Shimmer Animations:** Gold gradient text shimmer on the brand logo
- **Animated Counters:** KPI values count up on dashboard load
- **Status Badges:** Color-coded pills for order statuses, import/export types
- **Toast Notifications:** Success/error/info feedback on CRUD operations
- **Responsive Sidebar:** Section-grouped navigation with role badges
- **Modal Forms:** Dynamic "Add New" modals for all entity types

---

## 🧠 DBMS Concepts Demonstrated

| Concept | Implementation |
|---------|---------------|
| **Normalization (3NF)** | All tables normalized; no redundant data |
| **Foreign Keys** | `ON DELETE CASCADE` / `SET NULL` across all relationships |
| **ISA Hierarchy** | Employee specialization via `manager`, `engineer`, `lawyer`, etc. |
| **M:N Relationships** | Bridge tables (`owns`, `performs_rel`, `inventory`, etc.) |
| **Aggregate Queries** | `SUM`, `COUNT`, `AVG` for dashboard KPIs |
| **Complex JOINs** | Multi-table joins for employee roles, order summaries |
| **Subqueries** | Nested queries in dashboard analytics |
| **Indexing** | Primary keys, unique constraints (`registration_no`, `gst_no`) |
| **Constraints** | `CHECK` constraints (e.g., `import_export IN ('Import','Export')`) |
| **Transactions** | Atomic seed data insertion with error handling |

---

## 🧪 Demo Accounts

| Username | Role | Display Name |
|----------|------|-------------|
| `admin` | Super Admin | System Administrator |
| `hr_manager` | HR | Meera Kapoor |
| `prod_head` | Production | Rajesh Kumar |
| `inv_manager` | Inventory | Sunil Mehta |
| `fin_head` | Finance | Karan Johar |
| `legal_head` | Legal | Priya Das |
| `log_manager` | Logistics | Ramesh Yadav |
| `buyer_user` | B2B Buyer | Vikram Singh |
| `share_user` | Shareholder | Rahul Sharma |

> **Password for all accounts:** `password123`

---

## 📜 License

This project was built as an academic project for the **Database Management Systems** course at **SRM Institute of Science and Technology**. It is intended for educational purposes.

---

<div align="center">
  <sub>Built with ❤️ for DBMS coursework — PBCMS v1.0</sub>
</div>
]]>
