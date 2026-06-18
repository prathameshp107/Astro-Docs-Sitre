// ───────────────────────────────────────────────────
// SQL Labs — Complete Curriculum Data
// 16 Lessons · 10 Query Challenges · Sample Databases
// ───────────────────────────────────────────────────

// ─── SAMPLE DATABASES ───

export const SQL_DATABASES = {
  employees: {
    name: "Employees",
    description: "Company employee management database with departments and salaries.",
    tables: {
      employees: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "first_name", type: "TEXT", constraints: "NOT NULL" },
          { name: "last_name", type: "TEXT", constraints: "NOT NULL" },
          { name: "email", type: "TEXT", constraints: "UNIQUE" },
          { name: "department_id", type: "INTEGER", constraints: "FOREIGN KEY → departments.id" },
          { name: "salary", type: "REAL", constraints: "" },
          { name: "hire_date", type: "TEXT", constraints: "" },
        ],
        data: [
          [1, "Alice", "Johnson", "alice@example.com", 1, 85000, "2020-03-15"],
          [2, "Bob", "Smith", "bob@example.com", 2, 72000, "2019-07-22"],
          [3, "Charlie", "Brown", "charlie@example.com", 1, 95000, "2018-01-10"],
          [4, "Diana", "Prince", "diana@example.com", 3, 110000, "2021-11-01"],
          [5, "Eve", "Davis", "eve@example.com", 2, 64000, "2022-04-18"],
          [6, "Frank", "Miller", "frank@example.com", 1, 78000, "2020-09-05"],
          [7, "Grace", "Wilson", "grace@example.com", 4, 92000, "2019-12-12"],
          [8, "Henry", "Taylor", "henry@example.com", 3, 105000, "2017-06-30"],
          [9, "Ivy", "Anderson", "ivy@example.com", 4, 88000, "2021-02-14"],
          [10, "Jack", "Thomas", "jack@example.com", 2, 59000, "2023-01-08"],
        ],
      },
      departments: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "name", type: "TEXT", constraints: "NOT NULL" },
          { name: "location", type: "TEXT", constraints: "" },
        ],
        data: [
          [1, "Engineering", "New York"],
          [2, "Marketing", "San Francisco"],
          [3, "Finance", "Chicago"],
          [4, "Human Resources", "Boston"],
        ],
      },
    },
  },
  ecommerce: {
    name: "E-Commerce",
    description: "Online store database with customers, products, and orders.",
    tables: {
      customers: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "name", type: "TEXT", constraints: "NOT NULL" },
          { name: "email", type: "TEXT", constraints: "UNIQUE" },
          { name: "city", type: "TEXT", constraints: "" },
          { name: "signup_date", type: "TEXT", constraints: "" },
        ],
        data: [
          [1, "John Doe", "john@example.com", "New York", "2023-01-15"],
          [2, "Jane Smith", "jane@example.com", "Los Angeles", "2023-02-20"],
          [3, "Mike Johnson", "mike@example.com", "Chicago", "2023-03-10"],
          [4, "Sarah Williams", "sarah@example.com", "Houston", "2023-04-05"],
          [5, "Tom Brown", "tom@example.com", "Phoenix", "2023-05-01"],
          [6, "Lisa Davis", "lisa@example.com", "New York", "2023-06-15"],
        ],
      },
      products: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "name", type: "TEXT", constraints: "NOT NULL" },
          { name: "category", type: "TEXT", constraints: "" },
          { name: "price", type: "REAL", constraints: "" },
          { name: "stock", type: "INTEGER", constraints: "" },
        ],
        data: [
          [1, "Laptop Pro", "Electronics", 1299.99, 25],
          [2, "Wireless Mouse", "Electronics", 29.99, 100],
          [3, "Desk Lamp", "Home", 45.00, 60],
          [4, "Coffee Maker", "Home", 79.99, 35],
          [5, "Running Shoes", "Sports", 89.99, 50],
          [6, "Yoga Mat", "Sports", 24.99, 80],
          [7, "Notebook Set", "Stationery", 12.99, 200],
          [8, "Water Bottle", "Sports", 19.99, 150],
        ],
      },
      orders: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "customer_id", type: "INTEGER", constraints: "FOREIGN KEY → customers.id" },
          { name: "order_date", type: "TEXT", constraints: "" },
          { name: "total", type: "REAL", constraints: "" },
          { name: "status", type: "TEXT", constraints: "" },
        ],
        data: [
          [1, 1, "2024-01-10", 1329.98, "delivered"],
          [2, 2, "2024-01-12", 109.98, "delivered"],
          [3, 3, "2024-01-15", 45.00, "shipped"],
          [4, 1, "2024-02-01", 89.99, "delivered"],
          [5, 4, "2024-02-05", 104.98, "processing"],
          [6, 5, "2024-02-10", 79.99, "shipped"],
          [7, 2, "2024-02-15", 12.99, "processing"],
          [8, 6, "2024-03-01", 1329.98, "delivered"],
          [9, 3, "2024-03-05", 44.98, "delivered"],
          [10, 1, "2024-03-10", 24.99, "processing"],
        ],
      },
      order_items: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "order_id", type: "INTEGER", constraints: "FOREIGN KEY → orders.id" },
          { name: "product_id", type: "INTEGER", constraints: "FOREIGN KEY → products.id" },
          { name: "quantity", type: "INTEGER", constraints: "" },
          { name: "unit_price", type: "REAL", constraints: "" },
        ],
        data: [
          [1, 1, 1, 1, 1299.99],
          [2, 1, 2, 1, 29.99],
          [3, 2, 5, 1, 89.99],
          [4, 2, 6, 1, 19.99],
          [5, 3, 3, 1, 45.00],
          [6, 4, 5, 1, 89.99],
          [7, 5, 4, 1, 79.99],
          [8, 5, 7, 1, 12.99],
          [9, 5, 8, 1, 19.99],
          [10, 6, 4, 1, 79.99],
        ],
      },
    },
  },
};

// ─── DATABASE PROJECTS ───

export const SQL_PROJECTS = [
  {
    id: "project-ecommerce",
    title: "E-Commerce Database",
    description: "Build a complete e-commerce database from scratch. You'll design tables, add relationships, insert sample data, and write business intelligence queries.",
    difficulty: "Intermediate",
    estimatedTime: "30-45 minutes",
    database: "blank",
    icon: "🛒",
    tags: ["Schema Design", "CRUD", "JOINs", "Aggregation"],
    milestones: [
      {
        id: "ecom-m1",
        title: "Create Tables",
        task: `Create the following tables for an e-commerce system:

1. \`customers\` — id (INTEGER PK), name (TEXT NOT NULL), email (TEXT UNIQUE), city (TEXT), signup_date (TEXT)
2. \`products\` — id (INTEGER PK), name (TEXT NOT NULL), category (TEXT), price (REAL), stock (INTEGER)
3. \`orders\` — id (INTEGER PK), customer_id (INTEGER), order_date (TEXT), total (REAL), status (TEXT)
4. \`order_items\` — id (INTEGER PK), order_id (INTEGER), product_id (INTEGER), quantity (INTEGER), unit_price (REAL)`,
        hints: ["Use CREATE TABLE with column definitions", "INTEGER PRIMARY KEY creates auto-increment IDs", "NOT NULL prevents empty values"],
        solutionQuery: `CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  city TEXT,
  signup_date TEXT
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price REAL,
  stock INTEGER
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  order_date TEXT,
  total REAL,
  status TEXT
);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  unit_price REAL
);`,
      },
      {
        id: "ecom-m2",
        title: "Add Foreign Keys & Constraints",
        task: `Add foreign key constraints to your tables:

1. orders.customer_id → customers.id
2. order_items.order_id → orders.id
3. order_items.product_id → products.id
4. Add a CHECK to ensure price > 0 on products
5. Add a DEFAULT of 'pending' for orders.status

Use ALTER TABLE to add constraints.`,
        hints: ["Use ALTER TABLE table ADD FOREIGN KEY (col) REFERENCES other(col)", "CHECK constraints go in CREATE TABLE or via ALTER", "SQLite requires PRAGMA foreign_keys = ON to enforce FKs"],
        solutionQuery: `-- First enable foreign key enforcement
PRAGMA foreign_keys = ON;

-- Add foreign key to orders
ALTER TABLE orders ADD FOREIGN KEY (customer_id) REFERENCES customers(id);

-- Drop and recreate order_items with proper constraints (simplest approach)
DROP TABLE IF EXISTS order_items;
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER CHECK(quantity > 0),
  unit_price REAL CHECK(unit_price >= 0),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Add CHECK constraint to products (SQLite requires table recreation)
-- Alternative: enforce in application layer
ALTER TABLE products ADD CHECK(price > 0);

-- Add default status to orders
-- SQLite: recreate table or handle in INSERT statements`,
      },
      {
        id: "ecom-m3",
        title: "Insert Sample Data",
        task: `Insert realistic sample data:

1. Insert 5 customers with varied cities and dates
2. Insert 8 products across categories (Electronics, Home, Sports, Stationery)
3. Insert 6 orders with different statuses
4. Insert 8 order_items linking orders to products
5. Verify your data with SELECT queries`,
        hints: ["INSERT INTO table (cols) VALUES (vals)", "Use realistic prices and quantities", "Make sure order_ids reference existing orders"],
        solutionQuery: `INSERT INTO customers (name, email, city, signup_date) VALUES
  ('Alice Johnson', 'alice@email.com', 'New York', '2024-01-15'),
  ('Bob Smith', 'bob@email.com', 'Los Angeles', '2024-02-20'),
  ('Carol White', 'carol@email.com', 'Chicago', '2024-03-10'),
  ('David Brown', 'david@email.com', 'Houston', '2024-04-05'),
  ('Eve Davis', 'eve@email.com', 'Phoenix', '2024-05-01');

INSERT INTO products (name, category, price, stock) VALUES
  ('Laptop Pro', 'Electronics', 1299.99, 25),
  ('Wireless Mouse', 'Electronics', 29.99, 100),
  ('Desk Lamp', 'Home', 45.00, 60),
  ('Coffee Maker', 'Home', 79.99, 35),
  ('Running Shoes', 'Sports', 89.99, 50),
  ('Yoga Mat', 'Sports', 24.99, 80),
  ('Notebook Set', 'Stationery', 12.99, 200),
  ('Water Bottle', 'Sports', 19.99, 150);

INSERT INTO orders (customer_id, order_date, total, status) VALUES
  (1, '2024-06-01', 1329.98, 'delivered'),
  (2, '2024-06-05', 109.98, 'delivered'),
  (3, '2024-06-10', 45.00, 'shipped'),
  (1, '2024-06-15', 89.99, 'delivered'),
  (4, '2024-06-20', 104.98, 'processing'),
  (5, '2024-06-25', 79.99, 'pending');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 1, 1, 1299.99),
  (1, 2, 1, 29.99),
  (2, 5, 1, 89.99),
  (2, 6, 1, 19.99),
  (3, 3, 1, 45.00),
  (4, 5, 1, 89.99),
  (5, 4, 1, 79.99),
  (5, 7, 2, 12.99);

-- Verify
SELECT 'Customers:', COUNT(*) FROM customers;
SELECT 'Products:', COUNT(*) FROM products;
SELECT 'Orders:', COUNT(*) FROM orders;
SELECT 'Order Items:', COUNT(*) FROM order_items;`,
      },
      {
        id: "ecom-m4",
        title: "Business Reporting Queries",
        task: `Write queries to analyze your e-commerce data:

1. Total revenue from all orders
2. Top 3 customers by total spent (name + total)
3. Products sorted by number of times ordered (most popular first)
4. Monthly revenue breakdown
5. Customers who have placed more than 1 order`,
        hints: ["Use SUM(total) for revenue", "JOIN + GROUP BY + ORDER BY + LIMIT for top customers", "LEFT JOIN products with order_items", "Use strftime for month extraction"],
        solutionQuery: `-- Total revenue
SELECT ROUND(SUM(total), 2) AS total_revenue FROM orders;

-- Top 3 customers by spend
SELECT c.name, ROUND(SUM(o.total), 2) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY total_spent DESC
LIMIT 3;

-- Products by popularity
SELECT p.name, COUNT(oi.id) AS times_ordered
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id
ORDER BY times_ordered DESC;

-- Monthly revenue
SELECT strftime('%Y-%m', order_date) AS month,
  ROUND(SUM(total), 2) AS revenue
FROM orders
GROUP BY month
ORDER BY month;

-- Customers with >1 order
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
HAVING order_count > 1;`,
      },
      {
        id: "ecom-m5",
        title: "Create Dashboard Views",
        task: `Create views for a sales dashboard:

1. \`customer_summary\` — name, total_orders, total_spent, avg_order_value
2. \`product_performance\` — name, category, times_ordered, total_revenue
3. \`daily_sales\` — order_date, order_count, revenue
4. Query your views to verify they work`,
        hints: ["CREATE VIEW name AS SELECT ...", "Views simplify complex queries into virtual tables", "SELECT * FROM view_name to query a view"],
        solutionQuery: `-- Customer summary view
CREATE VIEW customer_summary AS
SELECT c.name,
  COUNT(o.id) AS total_orders,
  ROUND(COALESCE(SUM(o.total), 0), 2) AS total_spent,
  ROUND(COALESCE(AVG(o.total), 0), 2) AS avg_order_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id;

-- Product performance view
CREATE VIEW product_performance AS
SELECT p.name, p.category,
  COUNT(oi.id) AS times_ordered,
  ROUND(COALESCE(SUM(oi.quantity * oi.unit_price), 0), 2) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id;

-- Daily sales view
CREATE VIEW daily_sales AS
SELECT order_date,
  COUNT(*) AS order_count,
  ROUND(SUM(total), 2) AS revenue
FROM orders
GROUP BY order_date;

-- Test your views
SELECT * FROM customer_summary ORDER BY total_spent DESC;
SELECT * FROM product_performance ORDER BY total_revenue DESC;
SELECT * FROM daily_sales ORDER BY order_date;`,
      },
    ],
  },
  {
    id: "project-hospital",
    title: "Hospital Management System",
    description: "Design a hospital management database with patients, doctors, appointments, and treatments. Learn to model real-world medical data relationships.",
    difficulty: "Intermediate",
    estimatedTime: "30-45 minutes",
    database: "blank",
    icon: "🏥",
    tags: ["Schema Design", "Foreign Keys", "JOINs", "Date Queries"],
    milestones: [
      {
        id: "hosp-m1",
        title: "Create Tables",
        task: `Create the following tables for a hospital system:

1. \`departments\` — id (INTEGER PK), name (TEXT NOT NULL), head_doctor (TEXT), floor (INTEGER)
2. \`doctors\` — id (INTEGER PK), first_name (TEXT NOT NULL), last_name (TEXT NOT NULL), specialty (TEXT), department_id (INTEGER), phone (TEXT)
3. \`patients\` — id (INTEGER PK), first_name (TEXT NOT NULL), last_name (TEXT NOT NULL), date_of_birth (TEXT), gender (TEXT), phone (TEXT), blood_type (TEXT)
4. \`appointments\` — id (INTEGER PK), patient_id (INTEGER), doctor_id (INTEGER), appointment_date (TEXT), time (TEXT), status (TEXT), reason (TEXT)
5. \`treatments\` — id (INTEGER PK), appointment_id (INTEGER), diagnosis (TEXT), prescription (TEXT), cost (REAL), notes (TEXT)`,
        hints: ["Start with departments (no FK dependencies)", "Use TEXT for dates (ISO format: YYYY-MM-DD)", "INTEGER PRIMARY KEY creates auto-increment"],
        solutionQuery: `CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  head_doctor TEXT,
  floor INTEGER
);

CREATE TABLE doctors (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  specialty TEXT,
  department_id INTEGER,
  phone TEXT
);

CREATE TABLE patients (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth TEXT,
  gender TEXT,
  phone TEXT,
  blood_type TEXT
);

CREATE TABLE appointments (
  id INTEGER PRIMARY KEY,
  patient_id INTEGER,
  doctor_id INTEGER,
  appointment_date TEXT,
  time TEXT,
  status TEXT,
  reason TEXT
);

CREATE TABLE treatments (
  id INTEGER PRIMARY KEY,
  appointment_id INTEGER,
  diagnosis TEXT,
  prescription TEXT,
  cost REAL,
  notes TEXT
);`,
      },
      {
        id: "hosp-m2",
        title: "Add Relationships",
        task: `Add foreign key relationships:

1. doctors.department_id → departments.id
2. appointments.patient_id → patients.id
3. appointments.doctor_id → doctors.id
4. treatments.appointment_id → appointments.id
5. Add CHECK constraints: appointments.status IN ('scheduled', 'completed', 'cancelled'), treatments.cost >= 0`,
        hints: ["Foreign keys link related data across tables", "CHECK constraints enforce data validity", "SQLite needs table recreation for complex ALTERs"],
        solutionQuery: `PRAGMA foreign_keys = ON;

-- Drop and recreate with FKs (simplest approach for SQLite)
DROP TABLE IF EXISTS treatments;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS doctors;

CREATE TABLE doctors (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  specialty TEXT,
  department_id INTEGER REFERENCES departments(id),
  phone TEXT
);

CREATE TABLE appointments (
  id INTEGER PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patients(id),
  doctor_id INTEGER NOT NULL REFERENCES doctors(id),
  appointment_date TEXT,
  time TEXT,
  status TEXT CHECK(status IN ('scheduled', 'completed', 'cancelled')),
  reason TEXT
);

CREATE TABLE treatments (
  id INTEGER PRIMARY KEY,
  appointment_id INTEGER NOT NULL REFERENCES appointments(id),
  diagnosis TEXT,
  prescription TEXT,
  cost REAL CHECK(cost >= 0),
  notes TEXT
);`,
      },
      {
        id: "hosp-m3",
        title: "Insert Sample Data",
        task: `Insert realistic hospital data:

1. 4 departments (Cardiology, Neurology, Pediatrics, Orthopedics)
2. 6 doctors with specialties matching departments
3. 8 patients with varied demographics
4. 10 appointments (mix of scheduled, completed, cancelled)
5. 6 treatments for completed appointments
6. Verify with SELECT queries`,
        hints: ["Insert departments first (no dependencies)", "Reference existing IDs for foreign keys", "Use realistic medical data"],
        solutionQuery: `INSERT INTO departments (name, head_doctor, floor) VALUES
  ('Cardiology', 'Dr. Sarah Heart', 3),
  ('Neurology', 'Dr. James Brain', 4),
  ('Pediatrics', 'Dr. Emily Child', 2),
  ('Orthopedics', 'Dr. Mark Bone', 5);

INSERT INTO doctors (first_name, last_name, specialty, department_id, phone) VALUES
  ('Sarah', 'Heart', 'Cardiologist', 1, '555-0101'),
  ('James', 'Brain', 'Neurologist', 2, '555-0102'),
  ('Emily', 'Child', 'Pediatrician', 3, '555-0103'),
  ('Mark', 'Bone', 'Orthopedic', 4, '555-0104'),
  ('Lisa', 'Lung', 'Pulmonologist', 1, '555-0105'),
  ('Tom', 'Joint', 'Sports Medicine', 4, '555-0106');

INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, blood_type) VALUES
  ('Alice', 'Green', '1990-05-15', 'F', '555-1001', 'A+'),
  ('Bob', 'Blue', '1985-08-22', 'M', '555-1002', 'O+'),
  ('Charlie', 'Red', '1978-11-03', 'M', '555-1003', 'B+'),
  ('Diana', 'Yellow', '2000-02-14', 'F', '555-1004', 'AB+'),
  ('Edward', 'Purple', '1965-07-30', 'M', '555-1005', 'A-'),
  ('Fiona', 'Orange', '1995-12-25', 'F', '555-1006', 'O-'),
  ('George', 'Pink', '2015-04-10', 'M', '555-1007', 'A+'),
  ('Hannah', 'Brown', '1982-09-18', 'F', '555-1008', 'B-');

INSERT INTO appointments (patient_id, doctor_id, appointment_date, time, status, reason) VALUES
  (1, 1, '2024-07-01', '09:00', 'completed', 'Chest pain'),
  (2, 2, '2024-07-01', '10:00', 'completed', 'Headache'),
  (3, 4, '2024-07-02', '11:00', 'completed', 'Knee pain'),
  (4, 3, '2024-07-02', '14:00', 'completed', 'Annual checkup'),
  (5, 1, '2024-07-03', '09:30', 'completed', 'Heart murmur'),
  (6, 5, '2024-07-03', '10:30', 'completed', 'Breathing difficulty'),
  (7, 3, '2024-07-04', '15:00', 'scheduled', 'Fever'),
  (8, 2, '2024-07-05', '08:00', 'scheduled', 'Memory issues'),
  (1, 1, '2024-07-06', '09:00', 'cancelled', 'Follow-up'),
  (3, 4, '2024-07-07', '11:00', 'scheduled', 'Checkup');

INSERT INTO treatments (appointment_id, diagnosis, prescription, cost, notes) VALUES
  (1, 'Mild angina', 'Nitroglycerin 0.4mg', 250.00, 'Follow up in 2 weeks'),
  (2, 'Tension headache', 'Ibuprofen 400mg', 120.00, 'Reduce stress'),
  (3, 'ACL strain', 'Physical therapy', 350.00, 'Rest for 2 weeks'),
  (4, 'Healthy', 'None', 80.00, 'Continue routine checkups'),
  (5, 'Heart valve issue', 'Echocardiogram ordered', 500.00, 'Schedule echo test'),
  (6, 'Asthma exacerbation', 'Inhaler 2 puffs PRN', 180.00, 'Avoid triggers');

SELECT 'Departments:', COUNT(*) FROM departments;
SELECT 'Doctors:', COUNT(*) FROM doctors;
SELECT 'Patients:', COUNT(*) FROM patients;
SELECT 'Appointments:', COUNT(*) FROM appointments;
SELECT 'Treatments:', COUNT(*) FROM treatments;`,
      },
      {
        id: "hosp-m4",
        title: "Patient Care Queries",
        task: `Write queries for patient care analysis:

1. List all appointments with patient name, doctor name, and department
2. Show each doctor's appointment count, sorted by busiest first
3. Find patients with appointments in multiple departments
4. Calculate total revenue (sum of treatment costs) per department
5. Show patients who have cancelled appointments`,
        hints: ["Multi-table JOIN chain: appointments → patients → doctors → departments", "GROUP BY with COUNT for appointment stats", "SUM(treatments.cost) for revenue"],
        solutionQuery: `-- All appointments with patient, doctor, department
SELECT a.appointment_date, a.time,
  p.first_name || ' ' || p.last_name AS patient,
  d.first_name || ' ' || d.last_name AS doctor,
  dept.name AS department,
  a.status
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN doctors d ON a.doctor_id = d.id
JOIN departments dept ON d.department_id = dept.id
ORDER BY a.appointment_date;

-- Doctor appointment counts
SELECT d.first_name || ' ' || d.last_name AS doctor,
  COUNT(a.id) AS appointment_count
FROM doctors d
LEFT JOIN appointments a ON d.id = a.doctor_id
GROUP BY d.id
ORDER BY appointment_count DESC;

-- Patients in multiple departments
SELECT p.first_name || ' ' || p.last_name AS patient,
  COUNT(DISTINCT d.department_id) AS dept_count
FROM patients p
JOIN appointments a ON p.id = a.patient_id
JOIN doctors d ON a.doctor_id = d.id
GROUP BY p.id
HAVING dept_count > 1;

-- Revenue by department
SELECT dept.name AS department,
  ROUND(COALESCE(SUM(t.cost), 0), 2) AS total_revenue,
  COUNT(t.id) AS treatments_done
FROM departments dept
LEFT JOIN doctors d ON dept.id = d.department_id
LEFT JOIN appointments a ON d.id = a.doctor_id AND a.status = 'completed'
LEFT JOIN treatments t ON a.id = t.appointment_id
GROUP BY dept.id
ORDER BY total_revenue DESC;

-- Cancelled appointments
SELECT p.first_name || ' ' || p.last_name AS patient,
  a.appointment_date, a.reason
FROM appointments a
JOIN patients p ON a.patient_id = p.id
WHERE a.status = 'cancelled';`,
      },
      {
        id: "hosp-m5",
        title: "Hospital Analytics",
        task: `Create advanced analytics queries:

1. Find the busiest doctor (most completed appointments) using a CTE
2. Calculate average treatment cost by department
3. Show monthly appointment trends
4. Find patients who have spent the most on treatments
5. Create a view for a doctor dashboard with their appointment summary`,
        hints: ["Use WITH for CTEs", "strftime('%Y-%m', date) for monthly grouping", "Views simplify complex reporting"],
        solutionQuery: `-- Busiest doctor (CTE)
WITH doctor_stats AS (
  SELECT d.id, d.first_name || ' ' || d.last_name AS doctor,
    COUNT(a.id) AS completed_count
  FROM doctors d
  JOIN appointments a ON d.id = a.doctor_id
  WHERE a.status = 'completed'
  GROUP BY d.id
)
SELECT * FROM doctor_stats ORDER BY completed_count DESC LIMIT 1;

-- Average treatment cost by department
SELECT dept.name AS department,
  ROUND(AVG(t.cost), 2) AS avg_cost,
  ROUND(SUM(t.cost), 2) AS total_cost
FROM departments dept
JOIN doctors d ON dept.id = d.department_id
JOIN appointments a ON d.id = a.doctor_id
JOIN treatments t ON a.id = t.appointment_id
GROUP BY dept.id
ORDER BY avg_cost DESC;

-- Monthly appointment trends
SELECT strftime('%Y-%m', appointment_date) AS month,
  COUNT(*) AS total_appointments,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM appointments
GROUP BY month
ORDER BY month;

-- Top spending patients
SELECT p.first_name || ' ' || p.last_name AS patient,
  COUNT(t.id) AS treatments_count,
  ROUND(SUM(t.cost), 2) AS total_spent
FROM patients p
JOIN appointments a ON p.id = a.patient_id
JOIN treatments t ON a.id = t.appointment_id
GROUP BY p.id
ORDER BY total_spent DESC;

-- Doctor dashboard view
CREATE VIEW doctor_dashboard AS
SELECT d.first_name || ' ' || d.last_name AS doctor,
  dept.name AS department,
  COUNT(a.id) AS total_appointments,
  SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed,
  SUM(CASE WHEN a.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
  ROUND(AVG(COALESCE(t.cost, 0)), 2) AS avg_treatment_cost
FROM doctors d
JOIN departments dept ON d.department_id = dept.id
LEFT JOIN appointments a ON d.id = a.doctor_id
LEFT JOIN treatments t ON a.id = t.appointment_id
GROUP BY d.id;

-- View the dashboard
SELECT * FROM doctor_dashboard ORDER BY total_appointments DESC;`,
      },
    ],
  },
  {
    id: "project-banking",
    title: "Banking System",
    description: "Build a banking database with accounts, transactions, and loans. Implement transaction tracking, balance calculations, and risk analysis queries.",
    difficulty: "Advanced",
    estimatedTime: "45-60 minutes",
    database: "blank",
    icon: "🏦",
    tags: ["Schema Design", "Transactions", "Window Functions", "Risk Analysis"],
    milestones: [
      {
        id: "bank-m1",
        title: "Create Tables",
        task: `Create the following tables for a banking system:

1. \`branches\` — id (INTEGER PK), name (TEXT NOT NULL), address (TEXT), phone (TEXT)
2. \`customers\` — id (INTEGER PK), first_name (TEXT NOT NULL), last_name (TEXT NOT NULL), email (TEXT UNIQUE), phone (TEXT), address (TEXT)
3. \`accounts\` — id (INTEGER PK), customer_id (INTEGER), branch_id (INTEGER), account_type (TEXT), balance (REAL), opened_date (TEXT), status (TEXT)
4. \`transactions\` — id (INTEGER PK), account_id (INTEGER), transaction_date (TEXT), type (TEXT), amount (REAL), description (TEXT)
5. \`loans\` — id (INTEGER PK), customer_id (INTEGER), loan_amount (REAL), interest_rate (REAL), start_date (TEXT), term_months (INTEGER), status (TEXT)`,
        hints: ["Branches and customers have no FK dependencies", "Use REAL for monetary amounts", "TEXT for dates in ISO format"],
        solutionQuery: `CREATE TABLE branches (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT
);

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT
);

CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  branch_id INTEGER,
  account_type TEXT,
  balance REAL DEFAULT 0,
  opened_date TEXT,
  status TEXT DEFAULT 'active'
);

CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  account_id INTEGER,
  transaction_date TEXT,
  type TEXT,
  amount REAL,
  description TEXT
);

CREATE TABLE loans (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  loan_amount REAL,
  interest_rate REAL,
  start_date TEXT,
  term_months INTEGER,
  status TEXT DEFAULT 'active'
);`,
      },
      {
        id: "bank-m2",
        title: "Add Banking Constraints",
        task: `Add constraints to ensure data integrity:

1. accounts.customer_id → customers.id
2. accounts.branch_id → branches.id
3. transactions.account_id → accounts.id
4. loans.customer_id → customers.id
5. CHECK: account_type IN ('checking', 'savings', 'credit')
6. CHECK: transaction.type IN ('deposit', 'withdrawal', 'transfer', 'payment')
7. CHECK: accounts.balance >= 0 (no overdraft without proper handling)
8. CHECK: loan.interest_rate BETWEEN 0 AND 30`,
        hints: ["Use REFERENCES in CREATE TABLE for cleaner syntax", "CHECK constraints prevent invalid data", "Recreate tables with constraints for SQLite"],
        solutionQuery: `PRAGMA foreign_keys = ON;

-- Drop and recreate with constraints
DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  branch_id INTEGER NOT NULL REFERENCES branches(id),
  account_type TEXT CHECK(account_type IN ('checking', 'savings', 'credit')),
  balance REAL DEFAULT 0 CHECK(balance >= 0),
  opened_date TEXT,
  status TEXT DEFAULT 'active'
);

CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts(id),
  transaction_date TEXT,
  type TEXT CHECK(type IN ('deposit', 'withdrawal', 'transfer', 'payment')),
  amount REAL CHECK(amount > 0),
  description TEXT
);

CREATE TABLE loans (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  loan_amount REAL CHECK(loan_amount > 0),
  interest_rate REAL CHECK(interest_rate BETWEEN 0 AND 30),
  start_date TEXT,
  term_months INTEGER CHECK(term_months > 0),
  status TEXT DEFAULT 'active'
);`,
      },
      {
        id: "bank-m3",
        title: "Insert Sample Data",
        task: `Insert realistic banking data:

1. 3 branches (Downtown, Uptown, Airport)
2. 6 customers
3. 8 accounts (mix of checking, savings)
4. 12 transactions across accounts
5. 3 loans with different terms
6. Verify with SELECT queries`,
        hints: ["Insert branches and customers first", "Accounts reference both customers and branches", "Transactions must reference existing accounts"],
        solutionQuery: `INSERT INTO branches (name, address, phone) VALUES
  ('Downtown Branch', '100 Main Street', '555-2001'),
  ('Uptown Branch', '200 Park Avenue', '555-2002'),
  ('Airport Branch', '300 Terminal Road', '555-2003');

INSERT INTO customers (first_name, last_name, email, phone, address) VALUES
  ('John', 'Richards', 'john@email.com', '555-3001', '10 Oak St'),
  ('Jane', 'Saving', 'jane@email.com', '555-3002', '20 Elm St'),
  ('Mike', 'Loaner', 'mike@email.com', '555-3003', '30 Pine St'),
  ('Sarah', 'Investor', 'sarah@email.com', '555-3004', '40 Maple Ave'),
  ('Tom', 'Budget', 'tom@email.com', '555-3005', '50 Cedar Ln'),
  ('Lisa', 'Wealth', 'lisa@email.com', '555-3006', '60 Birch Blvd');

INSERT INTO accounts (customer_id, branch_id, account_type, balance, opened_date, status) VALUES
  (1, 1, 'checking', 5000.00, '2023-01-15', 'active'),
  (1, 1, 'savings', 25000.00, '2023-01-15', 'active'),
  (2, 1, 'checking', 3200.00, '2023-03-20', 'active'),
  (2, 2, 'savings', 15000.00, '2023-03-20', 'active'),
  (3, 2, 'checking', 1200.00, '2023-05-10', 'active'),
  (4, 3, 'checking', 8500.00, '2023-07-05', 'active'),
  (4, 3, 'savings', 50000.00, '2023-07-05', 'active'),
  (5, 1, 'checking', 800.00, '2024-01-10', 'active');

INSERT INTO transactions (account_id, transaction_date, type, amount, description) VALUES
  (1, '2024-06-01', 'deposit', 2000.00, 'Salary deposit'),
  (1, '2024-06-05', 'withdrawal', 500.00, 'ATM withdrawal'),
  (1, '2024-06-10', 'payment', 150.00, 'Utility bill'),
  (2, '2024-06-01', 'deposit', 1000.00, 'Transfer from checking'),
  (3, '2024-06-02', 'deposit', 3000.00, 'Salary deposit'),
  (3, '2024-06-07', 'withdrawal', 200.00, 'ATM withdrawal'),
  (4, '2024-06-03', 'deposit', 500.00, 'Interest payment'),
  (5, '2024-06-04', 'deposit', 2500.00, 'Freelance payment'),
  (5, '2024-06-08', 'transfer', 800.00, 'Transfer to savings'),
  (6, '2024-06-05', 'deposit', 5000.00, 'Salary deposit'),
  (6, '2024-06-12', 'payment', 1200.00, 'Rent payment'),
  (8, '2024-06-06', 'deposit', 1500.00, 'Salary deposit');

INSERT INTO loans (customer_id, loan_amount, interest_rate, start_date, term_months, status) VALUES
  (1, 100000.00, 5.5, '2024-01-15', 360, 'active'),
  (3, 25000.00, 8.0, '2024-03-01', 60, 'active'),
  (6, 500000.00, 4.5, '2024-05-01', 360, 'active');

SELECT 'Branches:', COUNT(*) FROM branches;
SELECT 'Customers:', COUNT(*) FROM customers;
SELECT 'Accounts:', COUNT(*) FROM accounts;
SELECT 'Transactions:', COUNT(*) FROM transactions;
SELECT 'Loans:', COUNT(*) FROM loans;`,
      },
      {
        id: "bank-m4",
        title: "Banking Operations Queries",
        task: `Write operational queries:

1. Show all accounts with customer name, branch name, and account type
2. Calculate each customer's total balance across all accounts
3. Show transaction history for a specific account with running balance
4. Find accounts with below-average balances
5. List all active loans with customer name, amount, and monthly payment (estimated)`,
        hints: ["Multi-table JOIN for account details", "SUM with GROUP BY for total balances", "Window function SUM() OVER for running balance"],
        solutionQuery: `-- Accounts with customer and branch
SELECT c.first_name || ' ' || c.last_name AS customer,
  b.name AS branch,
  a.account_type,
  a.balance,
  a.status
FROM accounts a
JOIN customers c ON a.customer_id = c.id
JOIN branches b ON a.branch_id = b.id
ORDER BY customer;

-- Customer total balances
SELECT c.first_name || ' ' || c.last_name AS customer,
  COUNT(a.id) AS account_count,
  ROUND(SUM(a.balance), 2) AS total_balance
FROM customers c
LEFT JOIN accounts a ON c.id = a.customer_id
GROUP BY c.id
ORDER BY total_balance DESC;

-- Transaction history with running balance
SELECT t.transaction_date, t.type, t.amount, t.description,
  ROUND(SUM(CASE WHEN t.type IN ('deposit') THEN t.amount ELSE -t.amount END)
    OVER (ORDER BY t.transaction_date, t.id), 2) AS running_balance
FROM transactions t
WHERE t.account_id = 1
ORDER BY t.transaction_date;

-- Below average balances
SELECT c.first_name || ' ' || c.last_name AS customer,
  a.account_type,
  a.balance
FROM accounts a
JOIN customers c ON a.customer_id = c.id
WHERE a.balance < (SELECT AVG(balance) FROM accounts)
ORDER BY a.balance;

-- Active loans with estimated monthly payment (simple interest approximation)
SELECT c.first_name || ' ' || c.last_name AS customer,
  l.loan_amount,
  l.interest_rate,
  l.term_months,
  ROUND(l.loan_amount / l.term_months + (l.loan_amount * l.interest_rate / 100 / 12), 2) AS est_monthly
FROM loans l
JOIN customers c ON l.customer_id = c.id
WHERE l.status = 'active'
ORDER BY l.loan_amount DESC;`,
      },
      {
        id: "bank-m5",
        title: "Risk Analysis & Reports",
        task: `Create advanced risk analysis queries:

1. Find customers with high loan-to-deposit ratio (loan amount / total balance)
2. Show monthly deposit and withdrawal totals
3. Identify accounts with suspicious activity (>3 withdrawals in a month)
4. Create a customer_risk view classifying customers by risk level
5. Calculate branch performance metrics (total deposits, loans, active accounts)`,
        hints: ["Use CTEs for complex calculations", "CASE statements for risk classification", "JOIN across multiple tables for branch metrics"],
        solutionQuery: `-- High loan-to-deposit ratio
WITH customer_finances AS (
  SELECT c.id, c.first_name || ' ' || c.last_name AS customer,
    COALESCE(SUM(a.balance), 0) AS total_deposits,
    COALESCE(SUM(l.loan_amount), 0) AS total_loans
  FROM customers c
  LEFT JOIN accounts a ON c.id = a.customer_id
  LEFT JOIN loans l ON c.id = l.customer_id AND l.status = 'active'
  GROUP BY c.id
)
SELECT customer, ROUND(total_deposits, 2) AS deposits,
  ROUND(total_loans, 2) AS loans,
  ROUND(CASE WHEN total_deposits > 0 THEN total_loans / total_deposits ELSE total_loans END, 2) AS ratio
FROM customer_finances
ORDER BY ratio DESC;

-- Monthly transaction summary
SELECT strftime('%Y-%m', transaction_date) AS month,
  ROUND(SUM(CASE WHEN type IN ('deposit') THEN amount ELSE 0 END), 2) AS total_deposits,
  ROUND(SUM(CASE WHEN type IN ('withdrawal', 'payment') THEN amount ELSE 0 END), 2) AS total_outflows,
  COUNT(*) AS transaction_count
FROM transactions
GROUP BY month
ORDER BY month;

-- Suspicious activity (accounts with >3 withdrawals in a month)
SELECT a.id AS account_id,
  c.first_name || ' ' || c.last_name AS customer,
  strftime('%Y-%m', t.transaction_date) AS month,
  COUNT(*) AS withdrawal_count,
  ROUND(SUM(t.amount), 2) AS total_withdrawn
FROM transactions t
JOIN accounts a ON t.account_id = a.id
JOIN customers c ON a.customer_id = c.id
WHERE t.type = 'withdrawal'
GROUP BY a.id, month
HAVING withdrawal_count > 3;

-- Customer risk view
CREATE VIEW customer_risk AS
WITH finances AS (
  SELECT c.id,
    c.first_name || ' ' || c.last_name AS customer,
    COALESCE(SUM(a.balance), 0) AS total_balance,
    COALESCE(SUM(l.loan_amount), 0) AS total_loans,
    COUNT(DISTINCT a.id) AS account_count
  FROM customers c
  LEFT JOIN accounts a ON c.id = a.customer_id
  LEFT JOIN loans l ON c.id = l.customer_id AND l.status = 'active'
  GROUP BY c.id
)
SELECT customer,
  ROUND(total_balance, 2) AS total_balance,
  ROUND(total_loans, 2) AS total_loans,
  account_count,
  CASE
    WHEN total_loans = 0 THEN 'Low'
    WHEN total_loans > total_balance * 2 THEN 'High'
    WHEN total_loans > total_balance THEN 'Medium'
    ELSE 'Low'
  END AS risk_level,
  CASE
    WHEN total_loans = 0 THEN 'No active loans'
    WHEN total_loans > total_balance * 2 THEN 'Highly leveraged — review needed'
    WHEN total_loans > total_balance THEN 'Moderate leverage — monitor'
    ELSE 'Healthy financial position'
  END AS risk_notes
FROM finances;

-- Branch performance
SELECT b.name AS branch,
  COUNT(DISTINCT a.id) AS active_accounts,
  ROUND(SUM(a.balance), 2) AS total_deposits,
  ROUND(AVG(a.balance), 2) AS avg_account_balance
FROM branches b
LEFT JOIN accounts a ON b.id = a.branch_id AND a.status = 'active'
GROUP BY b.id
ORDER BY total_deposits DESC;

-- View the risk report
SELECT * FROM customer_risk ORDER BY risk_level DESC;`,
      },
    ],
  },
];
// ─── HELPER: Create a database instance from sample data ───

export function createSampleDatabase(db) {
  db.run("PRAGMA foreign_keys = OFF;");
  Object.values(SQL_DATABASES).forEach(schema => {
    Object.entries(schema.tables).forEach(([tableName, tableDef]) => {
      const cols = tableDef.columns.map(c => `${c.name} ${c.type}`).join(", ");
      db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${cols});`);
      const placeholders = tableDef.columns.map(() => "?").join(", ");
      const stmt = db.prepare(`INSERT OR IGNORE INTO ${tableName} VALUES (${placeholders});`);
      tableDef.data.forEach(row => {
        stmt.run(row);
      });
      stmt.free();
    });
  });
  db.run("PRAGMA foreign_keys = ON;");
}

// ─── HELPER: Create an empty database for projects ───

export function createEmptyDatabase(db) {
  db.run("PRAGMA foreign_keys = OFF;");
  // No tables — user creates them from scratch
  db.run("PRAGMA foreign_keys = ON;");
}

// ─── SQL LESSONS ───

export const SQL_LESSONS = [
  {
    id: "select-basics",
    chapter: 1,
    title: "SELECT Basics",
    level: "Beginner",
    tags: ["SELECT", "FROM", "Columns"],
    database: "employees",
    conceptExplanation: `The SELECT statement is used to retrieve data from a database.

**Basic Syntax:**
SELECT column1, column2 FROM table_name;

**Select All Columns:**
SELECT * FROM employees;

**Select Specific Columns:**
SELECT first_name, last_name FROM employees;

**Using Aliases:**
SELECT first_name AS name FROM employees;

**Real-World Usage:**
• Dashboard queries — "Show me all customer names"
• Data exploration — "What columns does this table have?"
• API development — "Fetch user profile data"

**Common Mistakes:**
• Forgetting commas between column names
• Using * when you only need specific columns (performance!)
• Misspelling table or column names`,
    keyRules: [
      "SELECT specifies which columns to retrieve",
      "FROM specifies which table to query",
      "Use AS for column aliases (optional, improves readability)",
      "SQL keywords are case-insensitive but conventionally written in UPPERCASE",
      "Use specific column names instead of * for better performance",
      "End each statement with a semicolon",
    ],
    task: `Write a query to:
1. Select all columns from the employees table
2. Select only first_name and salary from employees
3. Select first_name, last_name, and salary with an alias "Annual Salary" for the salary column
4. Select distinct department_id values from employees`,
    starterQuery: `-- Write your SQL query here
SELECT 
FROM employees;
`,
    expectedOutput: [
      { columns: ["id", "first_name", "last_name", "email", "department_id", "salary", "hire_date"], rows: 10 },
      { columns: ["first_name", "salary"], rows: 10 },
      { columns: ["first_name", "last_name", "Annual Salary"], rows: 10 },
      { columns: ["department_id"], rows: 4 },
    ],
    solutionQuery: `-- Task 1: Select all
SELECT * FROM employees;

-- Task 2: Select specific columns
SELECT first_name, salary FROM employees;

-- Task 3: Select with alias
SELECT first_name, last_name, salary AS "Annual Salary" FROM employees;

-- Task 4: Distinct values
SELECT DISTINCT department_id FROM employees;`,
    hint: "• Use * to select all columns\n• Separate column names with commas\n• Use AS to create an alias: column_name AS alias\n• DISTINCT removes duplicate values",
    tests: [
      { name: "Query uses SELECT", validate: (q) => q.toUpperCase().includes("SELECT") },
      { name: "Query specifies FROM", validate: (q) => q.toUpperCase().includes("FROM") },
      { name: "References employees table", validate: (q) => q.toLowerCase().includes("employees") },
    ],
  },
  {
    id: "where-clause",
    chapter: 2,
    title: "WHERE Clause",
    level: "Beginner",
    tags: ["WHERE", "Filtering", "Conditions", "Comparison"],
    database: "employees",
    conceptExplanation: `The WHERE clause filters records based on specified conditions.

**Basic Syntax:**
SELECT column1, column2 FROM table WHERE condition;

**Comparison Operators:**
• = — Equal to
• <> or != — Not equal to
• > — Greater than
• < — Less than
• >= — Greater than or equal
• <= — Less than or equal

**Logical Operators:**
• AND — Both conditions must be true
• OR — At least one condition must be true
• NOT — Negates a condition
• IN — Matches any value in a list
• BETWEEN — Within a range (inclusive)
• LIKE — Pattern matching (% for wildcard)

**Examples:**
SELECT * FROM employees WHERE salary > 80000;
SELECT * FROM employees WHERE department_id = 1 AND salary >= 90000;
SELECT * FROM employees WHERE department_id IN (1, 3);
SELECT * FROM employees WHERE salary BETWEEN 70000 AND 100000;
SELECT * FROM employees WHERE last_name LIKE 'S%';`,
    keyRules: [
      "WHERE comes after FROM and before ORDER BY",
      "Use single quotes for string values: WHERE name = 'Alice'",
      "AND has higher precedence than OR — use parentheses to group",
      "BETWEEN is inclusive: BETWEEN 10 AND 20 includes 10 and 20",
      "Use LIKE with % for pattern matching: 'A%' starts with A, '%son%' contains 'son'",
      "NULL comparisons require IS NULL or IS NOT NULL, not = NULL",
    ],
    task: `Write queries to:
1. Find all employees with salary greater than 90000
2. Find employees in department 1 (Engineering) who earn more than 80000
3. Find employees whose last name starts with 'S'
4. Find employees hired between 2020-01-01 and 2021-12-31
5. Find employees NOT in departments 2 or 4`,
    starterQuery: `-- Filter employees by salary
SELECT first_name, last_name, salary
FROM employees
WHERE ;
`,
    expectedOutput: [
      { columns: ["first_name", "last_name", "salary"], desc: "Salary > 90000" },
      { columns: ["first_name", "last_name", "salary", "department_id"], desc: "Engineering with salary > 80000" },
      { columns: ["first_name", "last_name"], desc: "Last name starts with S" },
      { columns: ["*"], desc: "Hired between 2020-2021" },
      { columns: ["*"], desc: "Not in dept 2 or 4" },
    ],
    solutionQuery: `-- Salary > 90000
SELECT first_name, last_name, salary
FROM employees
WHERE salary > 90000;

-- Engineering dept (1) with salary > 80000
SELECT first_name, last_name, salary
FROM employees
WHERE department_id = 1 AND salary > 80000;

-- Last name starts with S
SELECT first_name, last_name
FROM employees
WHERE last_name LIKE 'S%';

-- Hired between 2020-2021
SELECT first_name, last_name, hire_date
FROM employees
WHERE hire_date BETWEEN '2020-01-01' AND '2021-12-31';

-- NOT in departments 2 or 4
SELECT first_name, last_name, department_id
FROM employees
WHERE department_id NOT IN (2, 4);`,
    hint: "• Use > for greater than, < for less than\n• Combine conditions with AND\n• LIKE 'S%' matches values starting with S\n• BETWEEN uses the format: BETWEEN 'value1' AND 'value2'\n• Use NOT IN (...) to exclude multiple values",
    tests: [
      { name: "Query uses WHERE clause", validate: (q) => q.toUpperCase().includes("WHERE") },
      { name: "Uses comparison or pattern matching", validate: (q) => /[><=]|LIKE|IN|BETWEEN/i.test(q) },
      { name: "References valid columns", validate: (q) => /salary|first_name|last_name|hire_date|department_id/i.test(q) },
    ],
  },
  {
    id: "order-by-limit",
    chapter: 3,
    title: "ORDER BY & LIMIT",
    level: "Beginner",
    tags: ["ORDER BY", "LIMIT", "Sorting", "ASC", "DESC"],
    database: "employees",
    conceptExplanation: `ORDER BY sorts the result set, and LIMIT restricts the number of rows returned.

**ORDER BY Syntax:**
SELECT column1, column2 FROM table ORDER BY column1 ASC;
SELECT column1, column2 FROM table ORDER BY column1 DESC;

**Multiple Sort Columns:**
SELECT * FROM employees ORDER BY department_id ASC, salary DESC;

**LIMIT Syntax:**
SELECT * FROM employees LIMIT 5;

**ORDER BY + LIMIT Combined:**
SELECT * FROM employees ORDER BY salary DESC LIMIT 3;
— Top 3 highest paid employees

**OFFSET (for pagination):**
SELECT * FROM employees ORDER BY id LIMIT 5 OFFSET 5;
— Skips first 5, returns next 5

**Real-World Usage:**
• "Show me the top 10 best-selling products"
• "Display newest users first"
• "Pagination: page 2 of search results"`,
    keyRules: [
      "ORDER BY comes after WHERE and before LIMIT",
      "Default sort order is ASC (ascending)",
      "Use DESC for descending order",
      "Sort by multiple columns: ORDER BY col1 ASC, col2 DESC",
      "LIMIT without ORDER BY returns arbitrary rows",
      "OFFSET is used with LIMIT for pagination",
    ],
    task: `Write queries to:
1. List all employees sorted by salary (highest first)
2. List employees sorted by department, then by last name alphabetically
3. Find the top 3 highest paid employees
4. Find the 3 most recently hired employees
5. Show 3 employees, skipping the first 2 (pagination)`,
    starterQuery: `-- Sort employees by salary descending
SELECT first_name, last_name, salary
FROM employees
ORDER BY ;
`,
    expectedOutput: [
      { columns: ["first_name", "last_name", "salary"], desc: "Sorted by salary DESC" },
      { columns: ["*"], desc: "Sorted by dept, then last_name" },
      { columns: ["first_name", "last_name", "salary"], desc: "Top 3 paid" },
      { columns: ["first_name", "last_name", "hire_date"], desc: "3 most recent hires" },
      { columns: ["*"], desc: "LIMIT 3 OFFSET 2" },
    ],
    solutionQuery: `-- Employees sorted by salary descending
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC;

-- By department, then last name
SELECT first_name, last_name, department_id
FROM employees
ORDER BY department_id ASC, last_name ASC;

-- Top 3 highest paid
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 3;

-- 3 most recently hired
SELECT first_name, last_name, hire_date
FROM employees
ORDER BY hire_date DESC
LIMIT 3;

-- Pagination: skip 2, show 3
SELECT first_name, last_name
FROM employees
ORDER BY id
LIMIT 3 OFFSET 2;`,
    hint: "• ORDER BY defaults to ASC — use DESC for descending\n• Multiple sort: ORDER BY col1 ASC, col2 DESC\n• LIMIT goes at the very end\n• OFFSET comes after LIMIT: LIMIT 5 OFFSET 10\n• For pagination: page 1 = OFFSET 0, page 2 = OFFSET 5",
    tests: [
      { name: "Query uses ORDER BY", validate: (q) => q.toUpperCase().includes("ORDER BY") },
      { name: "Uses DESC or ASC", validate: (q) => /DESC|ASC/i.test(q) },
      { name: "Uses LIMIT", validate: (q) => q.toUpperCase().includes("LIMIT") },
    ],
  },
  {
    id: "aggregate-functions",
    chapter: 4,
    title: "Aggregate Functions",
    level: "Beginner",
    tags: ["COUNT", "SUM", "AVG", "MIN", "MAX", "Aggregation"],
    database: "employees",
    conceptExplanation: `Aggregate functions perform calculations on multiple rows and return a single result.

**Common Aggregate Functions:**
• COUNT() — Number of rows
• SUM() — Total of numeric column
• AVG() — Average of numeric column
• MIN() — Minimum value
• MAX() — Maximum value

**Examples:**
SELECT COUNT(*) FROM employees;                               — Total employees
SELECT AVG(salary) FROM employees;                             — Average salary
SELECT MIN(salary), MAX(salary), ROUND(AVG(salary), 0) FROM employees;
SELECT COUNT(DISTINCT department_id) FROM employees;           — Count unique values

**Real-World Usage:**
• "How many orders were placed this month?"
• "What's the average order value?"
• "What's the total revenue by product category?"
• "Find the oldest and newest employee hire dates"`,
    keyRules: [
      "COUNT(*) counts all rows, COUNT(column) counts non-NULL values",
      "Aggregate functions ignore NULL values (except COUNT(*))",
      "Use DISTINCT inside aggregate: COUNT(DISTINCT column)",
      "AVG gives decimal results — use ROUND() to format",
      "Aggregates can't be used in WHERE — use HAVING instead",
    ],
    task: `Write queries to:
1. Count the total number of employees
2. Find the average salary of all employees (rounded to 0 decimals)
3. Find the minimum, maximum, and total salary
4. Count how many employees are in each department (use COUNT with GROUP BY — we'll cover GROUP BY next)
5. Count the number of distinct departments`,
    starterQuery: `-- Count total employees
SELECT 
FROM employees;
`,
    expectedOutput: [
      { columns: ["COUNT(*)"], desc: "Total employees = 10" },
      { columns: ["Average Salary"], desc: "Rounded average" },
      { columns: ["MIN", "MAX", "Total"], desc: "Salary stats" },
      { columns: ["department_id", "count"], desc: "Employees per dept" },
      { columns: ["COUNT(DISTINCT department_id)"], desc: "Distinct departments = 4" },
    ],
    solutionQuery: `-- Total employees
SELECT COUNT(*) FROM employees;

-- Average salary
SELECT ROUND(AVG(salary), 0) AS "Average Salary" FROM employees;

-- Min, max, total salary
SELECT MIN(salary) AS "Minimum", MAX(salary) AS "Maximum", SUM(salary) AS "Total" FROM employees;

-- Employees per department
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;

-- Distinct departments
SELECT COUNT(DISTINCT department_id) AS distinct_departments FROM employees;`,
    hint: "• COUNT(*) counts all rows\n• AVG(salary) calculates average\n• ROUND(number, 0) rounds to whole number\n• GROUP BY department_id groups rows by department\n• DISTINCT counts unique values only",
    tests: [
      { name: "Uses aggregate function", validate: (q) => /COUNT|SUM|AVG|MIN|MAX/i.test(q) },
      { name: "Uses proper function syntax", validate: (q) => /\(/i.test(q) },
      { name: "References employees table", validate: (q) => q.toLowerCase().includes("employees") },
    ],
  },
  {
    id: "group-by-having",
    chapter: 5,
    title: "GROUP BY & HAVING",
    level: "Beginner",
    tags: ["GROUP BY", "HAVING", "Grouping", "Filter Groups"],
    database: "employees",
    conceptExplanation: `GROUP BY groups rows that have the same values in specified columns. HAVING filters groups (like WHERE filters rows).

**GROUP BY Syntax:**
SELECT department_id, COUNT(*) FROM employees GROUP BY department_id;

**GROUP BY with Multiple Aggregates:**
SELECT department_id, COUNT(*) AS count, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id;

**HAVING (filter groups):**
SELECT department_id, COUNT(*) AS emp_count
FROM employees
GROUP BY department_id
HAVING emp_count >= 2;

**WHERE vs HAVING:**
• WHERE filters individual rows BEFORE grouping
• HAVING filters groups AFTER aggregation
• WHERE cannot use aggregate functions, HAVING can

**Real-World Usage:**
• "Which products have more than 10 orders?"
• "Average salary by department, showing only departments with 5+ employees"
• "Monthly revenue, showing only months with revenue > $10,000"`,
    keyRules: [
      "GROUP BY comes after WHERE and before ORDER BY",
      "Every column in SELECT must be in GROUP BY or an aggregate function",
      "HAVING is for filtering groups (after GROUP BY)",
      "Use WHERE to filter rows, HAVING to filter groups",
      "You can use column aliases in HAVING but not in WHERE",
    ],
    task: `Write queries to:
1. Count employees in each department
2. Find the average salary per department (rounded to 0 decimals)
3. Show departments with at least 2 employees
4. Find departments where the average salary is above 80000
5. Count employees by department, sorted by count descending`,
    starterQuery: `-- Count employees per department
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY ;
`,
    expectedOutput: [
      { columns: ["department_id", "employee_count"], desc: "Employee counts per dept" },
      { columns: ["department_id", "avg_salary"], desc: "Average salary per dept" },
      { columns: ["department_id", "employee_count"], desc: "Depts with ≥ 2 employees" },
      { columns: ["department_id", "avg_salary"], desc: "Depts with avg salary > 80000" },
      { columns: ["department_id", "employee_count"], desc: "Counts sorted descending" },
    ],
    solutionQuery: `-- Count per department
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;

-- Average salary per department
SELECT department_id, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
GROUP BY department_id;

-- Departments with ≥ 2 employees
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
HAVING employee_count >= 2;

-- Departments with avg salary > 80000
SELECT department_id, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 80000;

-- Count per department, sorted
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
ORDER BY employee_count DESC;`,
    hint: "• GROUP BY groups rows with same values\n• COUNT(*) counts rows in each group\n• AVG(salary) calculates group average\n• HAVING filters groups (can use aggregate functions)\n• ORDER BY works after GROUP BY too",
    tests: [
      { name: "Query uses GROUP BY", validate: (q) => q.toUpperCase().includes("GROUP BY") },
      { name: "Uses aggregate function with GROUP BY", validate: (q) => /COUNT|AVG|SUM|MIN|MAX/i.test(q) },
      { name: "References valid column for grouping", validate: (q) => /department_id/i.test(q) },
    ],
  },
  {
    id: "inner-joins",
    chapter: 6,
    title: "INNER JOINs",
    level: "Intermediate",
    tags: ["JOIN", "INNER JOIN", "Relationships", "Foreign Keys"],
    database: "employees",
    conceptExplanation: `JOINs combine rows from two or more tables based on a related column.

**INNER JOIN Syntax:**
SELECT columns
FROM table1
INNER JOIN table2 ON table1.column = table2.column;

**INNER JOIN returns only matching rows from both tables.**

**Example — Employees with Departments:**
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

**Naming Conventions:**
• Use table aliases for readability: FROM employees e
• Qualify column names with table alias: e.salary

**Real-World Usage:**
• "Show orders with customer names"
• "List products with their category names"
• "Display employees with their manager names"`,
    keyRules: [
      "INNER JOIN returns only rows where the condition matches in both tables",
      "Always use table aliases (e.g., e, d) for readability",
      "Qualify column names with table aliases when they exist in multiple tables",
      "The ON clause specifies how tables are related",
      "You can join multiple tables: A JOIN B ON ... JOIN C ON ...",
    ],
    task: `Write queries to:
1. List all employees with their department name (use INNER JOIN)
2. Show employee first_name, last_name, salary, and department name
3. Count how many employees are in each department (show department name)
4. Find employees in the Engineering department with salary > 80000`,
    starterQuery: `-- Employees with department names
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
`,
    expectedOutput: [
      { columns: ["first_name", "last_name", "department"], desc: "Employees with departments" },
      { columns: ["first_name", "last_name", "salary", "department"], desc: "Employees with salary and dept" },
      { columns: ["department", "employee_count"], desc: "Employee count per dept" },
      { columns: ["first_name", "last_name", "salary"], desc: "Engineering with salary > 80k" },
    ],
    solutionQuery: `-- All employees with departments
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Employees with salary and department
SELECT e.first_name, e.last_name, e.salary, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Employees per department (with name)
SELECT d.name AS department, COUNT(*) AS employee_count
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
GROUP BY d.name;

-- Engineering employees with salary > 80000
SELECT e.first_name, e.last_name, e.salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
WHERE d.name = 'Engineering' AND e.salary > 80000;`,
    hint: "• INNER JOIN: table1 INNER JOIN table2 ON condition\n• Use table aliases: FROM employees e JOIN departments d ON e.dept_id = d.id\n• Qualify columns: e.first_name, d.name\n• GROUP BY works with JOIN too: GROUP BY d.name",
    tests: [
      { name: "Query uses JOIN", validate: (q) => q.toUpperCase().includes("JOIN") },
      { name: "Has ON clause", validate: (q) => q.toUpperCase().includes("ON ") },
      { name: "Joins employees with departments", validate: (q) => q.toLowerCase().includes("employees") && q.toLowerCase().includes("departments") },
    ],
  },
  {
    id: "left-joins",
    chapter: 7,
    title: "LEFT JOINs",
    level: "Intermediate",
    tags: ["LEFT JOIN", "OUTER JOIN", "Optional matches"],
    database: "ecommerce",
    conceptExplanation: `LEFT JOIN returns ALL rows from the left table, with matching rows from the right table. If no match exists, NULL values are returned for right table columns.

**LEFT JOIN Syntax:**
SELECT columns
FROM left_table
LEFT JOIN right_table ON left_table.column = right_table.column;

**INNER JOIN vs LEFT JOIN:**
• INNER JOIN: Only matching rows from both tables
• LEFT JOIN: ALL rows from left table, matching rows from right

**Example — All customers with their orders:**
SELECT c.name, o.id AS order_id, o.total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;

**Real-World Usage:**
• "Show all products, even those never ordered"
• "List all students with their enrollment status"
• "Find customers who haven't placed any orders"`,
    keyRules: [
      "LEFT JOIN preserves all rows from the left table",
      "Rows without matches show NULL for right table columns",
      "Use IS NULL to find rows with no match",
      "Table order matters! Left table is the one before LEFT JOIN",
      "RIGHT JOIN is the opposite — rarely used, just swap table order",
    ],
    task: `Write queries to:
1. List all customers with their orders (show customers even if they have no orders)
2. Find customers who have NOT placed any orders (use LEFT JOIN + IS NULL)
3. Show customer name, order count, and total spent (include customers with 0 orders)
4. List all products and the number of times each has been ordered`,
    starterQuery: `-- All customers with orders (including those without)
SELECT c.name, o.id AS order_id, o.total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
`,
    expectedOutput: [
      { columns: ["name", "order_id", "total"], desc: "All customers with orders" },
      { columns: ["name"], desc: "Customers with no orders" },
      { columns: ["name", "order_count", "total_spent"], desc: "Customer summary" },
      { columns: ["name", "times_ordered"], desc: "Products ordered count" },
    ],
    solutionQuery: `-- All customers with orders
SELECT c.name, o.id AS order_id, o.total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;

-- Customers with no orders
SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;

-- Customer summary with order stats
SELECT c.name, COUNT(o.id) AS order_count, COALESCE(SUM(o.total), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;

-- Products times ordered
SELECT p.name, COUNT(oi.id) AS times_ordered
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name;`,
    hint: "• LEFT JOIN: table1 LEFT JOIN table2 ON condition\n• IS NULL finds non-matching rows: WHERE right_table.id IS NULL\n• COUNT(order.id) counts only matching orders\n• COALESCE(value, 0) replaces NULL with 0",
    tests: [
      { name: "Query uses LEFT JOIN", validate: (q) => q.toUpperCase().includes("LEFT JOIN") },
      { name: "Has appropriate table relationships", validate: (q) => q.toLowerCase().includes("id =") || q.toLowerCase().includes("id =") },
      { name: "References valid columns", validate: (q) => /customers|orders|products/i.test(q) },
    ],
  },
  {
    id: "subqueries",
    chapter: 8,
    title: "Subqueries",
    level: "Intermediate",
    tags: ["Subqueries", "Nested Queries", "IN", "EXISTS"],
    database: "employees",
    conceptExplanation: `A subquery is a query nested inside another query. It's enclosed in parentheses.

**Subquery in WHERE — with IN:**
SELECT first_name, last_name
FROM employees
WHERE department_id IN (
  SELECT id FROM departments WHERE location = 'New York'
);

**Subquery with comparison operator:**
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (
  SELECT AVG(salary) FROM employees
);

**Subquery in SELECT:**
SELECT first_name, last_name, salary,
  (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees;

**EXISTS Subquery:**
SELECT d.name FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e WHERE e.department_id = d.id
);

**Real-World Usage:**
• "Find employees who earn more than the average salary"
• "List products that have never been ordered"
• "Find the highest paid employee in each department"`,
    keyRules: [
      "Enclose subqueries in parentheses ()",
      "Subqueries in WHERE must return a single column (usually)",
      "Use IN for multiple values, = for single value",
      "Subqueries in SELECT must return a single value (scalar)",
      "EXISTS is more efficient than IN for large datasets",
      "Subqueries execute before the outer query in most cases",
    ],
    task: `Write queries to:
1. Find employees who earn more than the average salary
2. Find employees in departments located in 'New York'
3. Show each employee's salary compared to the company average
4. Find departments that have at least one employee (using EXISTS)
5. Find the highest paid employee in each department`,
    starterQuery: `-- Employees earning more than average
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (
  SELECT AVG(salary) FROM employees
);
`,
    expectedOutput: [
      { columns: ["first_name", "last_name", "salary"], desc: "Above average salary" },
      { columns: ["first_name", "last_name"], desc: "Employees in NY departments" },
      { columns: ["first_name", "salary", "company_avg", "difference"], desc: "Salary comparison" },
      { columns: ["name"], desc: "Departments with employees" },
      { columns: ["department", "employee", "max_salary"], desc: "Top paid per dept" },
    ],
    solutionQuery: `-- Above average salary
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Employees in New York departments
SELECT first_name, last_name
FROM employees
WHERE department_id IN (
  SELECT id FROM departments WHERE location = 'New York'
);

-- Salary vs company average
SELECT first_name, last_name, salary,
  ROUND((SELECT AVG(salary) FROM employees), 0) AS company_avg,
  ROUND(salary - (SELECT AVG(salary) FROM employees), 0) AS difference
FROM employees;

-- Departments with employees (EXISTS)
SELECT d.name
FROM departments d
WHERE EXISTS (
  SELECT 1 FROM employees e WHERE e.department_id = d.id
);

-- Highest paid per department
SELECT d.name AS department, e.first_name || ' ' || e.last_name AS employee, e.salary AS max_salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
WHERE e.salary = (
  SELECT MAX(salary) FROM employees WHERE department_id = e.department_id
);`,
    hint: "• Subquery: (SELECT ... FROM ...)\n• Use IN with subqueries returning multiple values\n• Scalar subquery in SELECT: (SELECT AVG(col) FROM table)\n• EXISTS: WHERE EXISTS (SELECT 1 FROM ...)\n• Correlated subquery references outer query: WHERE x = (SELECT ... FROM ... WHERE outer.col = inner.col)",
    tests: [
      { name: "Query contains a subquery", validate: (q) => q.includes("(") && q.toUpperCase().includes("SELECT") && q.indexOf("(") < q.indexOf("SELECT") },
      { name: "Subquery in WHERE or SELECT", validate: (q) => {
        const selectCount = (q.toUpperCase().match(/SELECT/g) || []).length;
        return selectCount >= 2;
      }},
    ],
  },
  {
    id: "case-when",
    chapter: 9,
    title: "CASE Statements",
    level: "Intermediate",
    tags: ["CASE", "WHEN", "THEN", "Conditional Logic"],
    database: "employees",
    conceptExplanation: `CASE is SQL's way of doing if/else logic. It creates a new column based on conditions.

**Simple CASE:**
SELECT first_name, salary,
  CASE
    WHEN salary >= 100000 THEN 'High'
    WHEN salary >= 75000 THEN 'Medium'
    ELSE 'Standard'
  END AS salary_level
FROM employees;

**CASE with GROUP BY — Custom Buckets:**
SELECT
  CASE
    WHEN salary >= 100000 THEN 'Executive'
    WHEN salary >= 80000 THEN 'Senior'
    WHEN salary >= 65000 THEN 'Mid'
    ELSE 'Junior'
  END AS level,
  COUNT(*) AS count
FROM employees
GROUP BY level;

**Real-World Usage:**
• "Categorize orders by value: Small, Medium, Large"
• "Create age groups for customer segmentation"
• "Assign letter grades based on scores"
• "Flag priority items based on multiple conditions"`,
    keyRules: [
      "CASE evaluates conditions in order — first match wins",
      "ELSE is optional but recommended as a catch-all",
      "END is required to close a CASE statement",
      "CASE can be used in SELECT, WHERE, ORDER BY, and GROUP BY",
      "Each WHEN/THEN pair is a condition and its result",
    ],
    task: `Write queries to:
1. Categorize employees by salary level: High (≥95000), Medium (≥75000), Standard (<75000)
2. Count employees in each salary category
3. Display employee names with a bonus column: 10% bonus if salary < 80000, 5% otherwise
4. Sort employees by a custom category order (High, Medium, Standard)`,
    starterQuery: `-- Categorize employees by salary
SELECT first_name, last_name, salary,
  CASE
    WHEN salary >= 95000 THEN 'High'
    ELSE 'Standard'
  END AS salary_level
FROM employees;
`,
    expectedOutput: [
      { columns: ["first_name", "last_name", "salary", "salary_level"], desc: "Salary categorization" },
      { columns: ["salary_level", "count"], desc: "Count per category" },
      { columns: ["first_name", "salary", "bonus"], desc: "Bonus calculation" },
      { columns: ["first_name", "salary", "salary_level"], desc: "Custom sort order" },
    ],
    solutionQuery: `-- Salary categories
SELECT first_name, last_name, salary,
  CASE
    WHEN salary >= 95000 THEN 'High'
    WHEN salary >= 75000 THEN 'Medium'
    ELSE 'Standard'
  END AS salary_level
FROM employees;

-- Count per category
SELECT
  CASE
    WHEN salary >= 95000 THEN 'High'
    WHEN salary >= 75000 THEN 'Medium'
    ELSE 'Standard'
  END AS salary_level,
  COUNT(*) AS count
FROM employees
GROUP BY salary_level;

-- Bonus calculation
SELECT first_name, last_name, salary,
  CASE
    WHEN salary < 80000 THEN ROUND(salary * 0.10, 0)
    ELSE ROUND(salary * 0.05, 0)
  END AS bonus
FROM employees;

-- Custom sort order
SELECT first_name, last_name, salary,
  CASE
    WHEN salary >= 95000 THEN 'High'
    WHEN salary >= 75000 THEN 'Medium'
    ELSE 'Standard'
  END AS salary_level
FROM employees
ORDER BY
  CASE salary_level
    WHEN 'High' THEN 1
    WHEN 'Medium' THEN 2
    WHEN 'Standard' THEN 3
  END;`,
    hint: "• CASE ... WHEN condition THEN result ... END\n• Works like if/else: first matching WHEN wins\n• ELSE is the default fallback\n• GROUP BY can use CASE for custom groupings\n• ORDER BY can use CASE for custom sort orders",
    tests: [
      { name: "Query uses CASE statement", validate: (q) => q.toUpperCase().includes("CASE") && q.toUpperCase().includes("END") },
      { name: "Has WHEN/THEN clauses", validate: (q) => q.toUpperCase().includes("WHEN") && q.toUpperCase().includes("THEN") },
      { name: "Uses ELSE or multiple conditions", validate: (q) => q.toUpperCase().includes("ELSE") || (q.match(/WHEN/g) || []).length >= 2 },
    ],
  },
  {
    id: "window-functions",
    chapter: 10,
    title: "Window Functions",
    level: "Advanced",
    tags: ["ROW_NUMBER", "RANK", "OVER", "PARTITION BY"],
    database: "employees",
    conceptExplanation: `Window functions perform calculations across a set of rows related to the current row — without collapsing them into a single output row.

**ROW_NUMBER() — Assign a unique number to each row:**
SELECT first_name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
FROM employees;

**RANK() / DENSE_RANK() — Ranking with ties:**
SELECT first_name, department_id, salary,
  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;

**PARTITION BY — Reset calculation for each group:**
SELECT first_name, department_id, salary,
  AVG(salary) OVER (PARTITION BY department_id) AS dept_avg
FROM employees;

**Key Difference from GROUP BY:**
• GROUP BY collapses rows
• Window functions keep all rows and add the calculation`,
    keyRules: [
      "Window functions use OVER() clause",
      "ORDER BY inside OVER defines the order for the function",
      "PARTITION BY resets the window for each group (like GROUP BY but preserves rows)",
      "ROW_NUMBER() gives unique ranks (no ties)",
      "RANK() gives same rank for ties but skips numbers, DENSE_RANK() doesn't skip",
    ],
    task: `Write queries to:
1. Assign a unique row number to each employee ordered by salary descending
2. Rank employees within each department by salary (highest first)
3. Show each employee's salary alongside their department's average salary
4. Find the top 2 highest paid employees in each department`,
    starterQuery: `-- Row number by salary descending
SELECT first_name, last_name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;
`,
    expectedOutput: [
      { columns: ["first_name", "last_name", "salary", "row_num"], desc: "Row number by salary" },
      { columns: ["first_name", "department_id", "salary", "dept_rank"], desc: "Department ranking" },
      { columns: ["first_name", "salary", "dept_avg"], desc: "Salary vs dept avg" },
      { columns: ["first_name", "department_id", "salary"], desc: "Top 2 per dept" },
    ],
    solutionQuery: `-- Row number by salary
SELECT first_name, last_name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;

-- Department ranking
SELECT first_name, last_name, department_id, salary,
  RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;

-- Salary vs department average
SELECT first_name, salary, department_id,
  ROUND(AVG(salary) OVER (PARTITION BY department_id), 0) AS dept_avg
FROM employees;

-- Top 2 per department
SELECT first_name, last_name, department_id, salary
FROM (
  SELECT first_name, last_name, department_id, salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
  FROM employees
) ranked
WHERE rn <= 2;`,
    hint: "• ROW_NUMBER() OVER (ORDER BY col) numbers rows\n• PARTITION BY col resets within each group\n• RANK() allows ties, ROW_NUMBER() doesn't\n• Use subquery for top-N per group: WHERE rn <= N",
    tests: [
      { name: "Uses a window function with OVER", validate: (q) => q.toUpperCase().includes("OVER") },
      { name: "Uses ROW_NUMBER or RANK or AVG OVER", validate: (q) => /ROW_NUMBER|RANK|AVG.*OVER/i.test(q) },
      { name: "Has ORDER BY in window clause", validate: (q) => q.toUpperCase().includes("ORDER BY") && q.toUpperCase().includes("OVER") },
    ],
  },
  {
    id: "ctes",
    chapter: 11,
    title: "Common Table Expressions (CTEs)",
    level: "Advanced",
    tags: ["CTE", "WITH", "Readability"],
    database: "employees",
    conceptExplanation: `A CTE (Common Table Expression) is a temporary named result set that you can reference within a query. It's defined using the WITH clause.

**Basic CTE:**
WITH high_earners AS (
  SELECT * FROM employees WHERE salary > 90000
)
SELECT first_name, last_name, salary FROM high_earners;

**Multiple CTEs:**
WITH
engineering AS (
  SELECT * FROM employees WHERE department_id = 1
),
dept_stats AS (
  SELECT department_id, AVG(salary) AS avg_sal
  FROM employees GROUP BY department_id
)
SELECT e.first_name, e.salary, ds.avg_sal
FROM engineering e
JOIN dept_stats ds ON e.department_id = ds.department_id;

**Recursive CTE:**
WITH RECURSIVE numbers(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 10
)
SELECT * FROM numbers;

**Benefits over Subqueries:**
• More readable — name your intermediate results
• Reusable — reference same CTE multiple times
• Recursive capabilities — hierarchy trees, sequences`,
    keyRules: [
      "WITH clause comes before the main SELECT",
      "CTE name is followed by AS (subquery)",
      "Multiple CTEs are separated by commas",
      "You can reference a CTE multiple times in the same query",
      "Use RECURSIVE for recursive queries (hierarchies, sequences)",
    ],
    task: `Write queries to:
1. Create a CTE for high earners (salary > 90000) and select from it
2. Use a CTE to calculate department averages, then join with employees
3. Use multiple CTEs: one for engineering, one for department stats
4. Use a recursive CTE to generate numbers 1 through 10`,
    starterQuery: `-- CTE for high earners
WITH high_earners AS (
  SELECT * FROM employees WHERE salary > 90000
)
SELECT first_name, last_name, salary FROM high_earners;
`,
    expectedOutput: [
      { columns: ["first_name", "last_name", "salary"], desc: "High earners via CTE" },
      { columns: ["first_name", "salary", "dept_avg"], desc: "Salary vs dept avg" },
      { columns: ["*"], desc: "Engineering with dept stats" },
      { columns: ["n"], desc: "Numbers 1-10" },
    ],
    solutionQuery: `-- High earners CTE
WITH high_earners AS (
  SELECT * FROM employees WHERE salary > 90000
)
SELECT first_name, last_name, salary FROM high_earners;

-- Department averages CTE
WITH dept_avg AS (
  SELECT department_id, ROUND(AVG(salary), 0) AS avg_salary
  FROM employees GROUP BY department_id
)
SELECT e.first_name, e.salary, da.avg_salary
FROM employees e
JOIN dept_avg da ON e.department_id = da.department_id;

-- Multiple CTEs
WITH
engineering AS (
  SELECT * FROM employees WHERE department_id = 1
),
dept_stats AS (
  SELECT department_id, COUNT(*) AS emp_count, ROUND(AVG(salary), 0) AS avg_sal
  FROM employees GROUP BY department_id
)
SELECT eng.first_name, eng.salary, ds.emp_count, ds.avg_sal
FROM engineering eng
JOIN dept_stats ds ON eng.department_id = ds.department_id;

-- Recursive CTE
WITH RECURSIVE numbers(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 10
)
SELECT * FROM numbers;`,
    hint: "• WITH name AS (subquery) ... SELECT ... FROM name\n• Separate multiple CTEs with commas\n• Recursive: WITH RECURSIVE name AS (base UNION ALL recursive)\n• CTEs make complex queries more readable",
    tests: [
      { name: "Query uses WITH clause", validate: (q) => q.toUpperCase().includes("WITH") },
      { name: "CTE defined with AS", validate: (q) => /WITH\s+\w+\s+AS\s*\(/i.test(q) },
      { name: "Main query references CTE", validate: (q) => {
        const withMatch = q.match(/WITH\s+(\w+)/i);
        if (!withMatch) return false;
        return q.toLowerCase().includes(withMatch[1].toLowerCase());
      }},
    ],
  },
  {
    id: "views",
    chapter: 12,
    title: "Views",
    level: "Advanced",
    tags: ["Views", "Virtual Tables", "CREATE VIEW"],
    database: "employees",
    conceptExplanation: `A view is a saved SQL query that acts like a virtual table. It doesn't store data — it stores the query definition.

**Creating a View:**
CREATE VIEW employee_details AS
SELECT e.id, e.first_name, e.last_name, d.name AS department, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;

**Using a View:**
SELECT * FROM employee_details WHERE salary > 80000;

**Benefits:**
• Security — Hide sensitive columns (like salary from some users)
• Simplicity — Save complex JOIN queries
• Consistency — Everyone uses the same query definition
• Reusability — Use in multiple places

**Read-Only by Default:**
Most views are read-only. You can't INSERT/UPDATE/DELETE through views with JOINs or aggregations.

**Dropping a View:**
DROP VIEW IF EXISTS view_name;`,
    keyRules: [
      "Views don't store data — they store query definitions",
      "View results are always current (runs the query each time)",
      "Complex views (with JOINs, GROUP BY) are typically read-only",
      "You can create views based on other views (but avoid deep nesting)",
      "Use IF NOT EXISTS / IF EXISTS for idempotent create/drop",
    ],
    task: `Write queries to:
1. Create a view named employee_overview that shows employee ID, name, department name, and salary
2. Write a query to select from this view
3. Create a view for department statistics (name, employee count, avg salary)
4. Query from the department stats view`,
    starterQuery: `-- Create employee overview view
CREATE VIEW employee_overview AS
SELECT e.id, e.first_name || ' ' || e.last_name AS name,
  d.name AS department, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;
`,
    expectedOutput: [
      { columns: ["id", "name", "department", "salary"], desc: "Employee overview view" },
      { columns: ["*"], desc: "Query from view" },
      { columns: ["department", "employee_count", "avg_salary"], desc: "Dept stats view" },
      { columns: ["*"], desc: "Query from dept stats view" },
    ],
    solutionQuery: `-- Create employee overview view
CREATE VIEW employee_overview AS
SELECT e.id, e.first_name || ' ' || e.last_name AS name,
  d.name AS department, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;

-- Query from the view
SELECT * FROM employee_overview WHERE salary > 80000;

-- Create department statistics view
CREATE VIEW dept_statistics AS
SELECT d.name AS department,
  COUNT(e.id) AS employee_count,
  ROUND(AVG(e.salary), 0) AS avg_salary
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name;

-- Query from dept stats view
SELECT * FROM dept_statistics ORDER BY avg_salary DESC;`,
    hint: "• CREATE VIEW name AS (query)\n• Use views to simplify complex JOINs\n• Views are refreshed on every query\n• Select from views just like tables: SELECT * FROM view_name",
    tests: [
      { name: "Query creates a view", validate: (q) => q.toUpperCase().includes("CREATE VIEW") },
      { name: "View defined with AS SELECT", validate: (q) => /CREATE\s+(OR\s+REPLACE\s+)?VIEW\s+\w+\s+AS\s+SELECT/i.test(q) },
    ],
  },
];

// ─── QUERY CHALLENGES ───

export const SQL_CHALLENGES = [
  {
    id: "challenge-employee-salaries",
    title: "1. Employee Salary Analysis",
    difficulty: "Easy",
    tags: ["Aggregation", "Filtering", "Sorting"],
    database: "employees",
    problem: "Find the top 3 highest paid employees along with their department names. Show first_name, last_name, department name, and salary.",
    schema: "employees (id, first_name, last_name, email, department_id, salary, hire_date)\ndepartments (id, name, location)",
    sampleData: "10 employees across 4 departments",
    expectedOutput: "Top 3 highest salaries with department names",
    solution: `SELECT e.first_name, e.last_name, d.name AS department, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC
LIMIT 3;`,
    hint: "• JOIN employees with departments\n• ORDER BY salary DESC\n• LIMIT 3",
    tests: [
      { name: "Query uses JOIN", validate: (q) => q.toUpperCase().includes("JOIN") },
      { name: "Query limits results", validate: (q) => q.toUpperCase().includes("LIMIT") },
      { name: "Returns salary column", validate: (q) => q.toLowerCase().includes("salary") },
    ],
  },
  {
    id: "challenge-department-avg",
    title: "2. Department Averages",
    difficulty: "Easy",
    tags: ["GROUP BY", "JOIN", "AVG"],
    database: "employees",
    problem: "Find the average salary for each department. Show department name and average salary, sorted by highest average first.",
    schema: "employees (department_id, salary)\ndepartments (id, name)",
    expectedOutput: "Department names with average salaries, sorted descending",
    solution: `SELECT d.name AS department, ROUND(AVG(e.salary), 0) AS avg_salary
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY avg_salary DESC;`,
    hint: "• JOIN employees with departments\n• GROUP BY department\n• Use AVG() and ROUND()\n• ORDER BY avg DESC",
    tests: [
      { name: "Query uses GROUP BY", validate: (q) => q.toUpperCase().includes("GROUP BY") },
      { name: "Uses AVG function", validate: (q) => q.toUpperCase().includes("AVG") },
      { name: "Uses JOIN", validate: (q) => q.toUpperCase().includes("JOIN") },
    ],
  },
  {
    id: "challenge-top-customers",
    title: "3. Top Customers",
    difficulty: "Medium",
    tags: ["JOIN", "GROUP BY", "Aggregation", "Sorting"],
    database: "ecommerce",
    problem: "Find the top 3 customers who have spent the most money. Show customer name, total orders, and total amount spent.",
    schema: "customers (id, name, email, city)\norders (id, customer_id, total, status)",
    expectedOutput: "Customer names with order count and total spent",
    solution: `SELECT c.name, COUNT(o.id) AS total_orders, SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC
LIMIT 3;`,
    hint: "• JOIN customers with orders\n• GROUP BY customer\n• Use COUNT() and SUM()\n• ORDER BY total DESC\n• LIMIT 3",
    tests: [
      { name: "Query uses JOIN", validate: (q) => q.toUpperCase().includes("JOIN") },
      { name: "Uses GROUP BY", validate: (q) => q.toUpperCase().includes("GROUP BY") },
      { name: "Uses SUM or COUNT", validate: (q) => /SUM|COUNT/i.test(q) },
    ],
  },
  {
    id: "challenge-duplicate-orders",
    title: "4. Duplicate Detection",
    difficulty: "Medium",
    tags: ["GROUP BY", "HAVING", "Aggregation"],
    database: "ecommerce",
    problem: "Find customers who have placed more than 1 order. Show customer name, email, and the number of orders they've placed.",
    schema: "customers (id, name, email)\norders (id, customer_id)",
    expectedOutput: "Customers with more than 1 order",
    solution: `SELECT c.name, c.email, COUNT(o.id) AS order_count
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email
HAVING COUNT(o.id) > 1;`,
    hint: "• JOIN customers with orders\n• GROUP BY customer\n• COUNT orders\n• HAVING filters groups (WHERE filters rows)",
    tests: [
      { name: "Query uses GROUP BY", validate: (q) => q.toUpperCase().includes("GROUP BY") },
      { name: "Uses HAVING clause", validate: (q) => q.toUpperCase().includes("HAVING") },
      { name: "Uses JOIN", validate: (q) => q.toUpperCase().includes("JOIN") },
    ],
  },
  {
    id: "challenge-monthly-revenue",
    title: "5. Monthly Revenue",
    difficulty: "Medium",
    tags: ["Aggregation", "Date Functions", "GROUP BY"],
    database: "ecommerce",
    problem: "Calculate total revenue per month from the orders table. Show month and total revenue, sorted by month ascending.",
    schema: "orders (id, customer_id, order_date, total, status)",
    expectedOutput: "Monthly revenue totals sorted chronologically",
    solution: `SELECT strftime('%Y-%m', order_date) AS month,
  ROUND(SUM(total), 2) AS revenue
FROM orders
GROUP BY month
ORDER BY month ASC;`,
    hint: "• Use strftime('%Y-%m', date) to extract year-month\n• GROUP BY the month expression\n• SUM(total) for revenue\n• ORDER BY month",
    tests: [
      { name: "Query uses GROUP BY", validate: (q) => q.toUpperCase().includes("GROUP BY") },
      { name: "Uses date function", validate: (q) => q.toLowerCase().includes("strftime") || q.toLowerCase().includes("date_") },
      { name: "Uses SUM aggregation", validate: (q) => q.toUpperCase().includes("SUM") },
    ],
  },
  {
    id: "challenge-user-retention",
    title: "6. User Retention",
    difficulty: "Hard",
    tags: ["JOIN", "Subquery", "Window Functions"],
    database: "ecommerce",
    problem: "For each customer, find the number of days between their first and last order. Show customer name, first order date, last order date, and days between.",
    schema: "customers (id, name)\norders (id, customer_id, order_date)",
    expectedOutput: "Customer name, first order, last order, days between",
    solution: `SELECT c.name,
  MIN(o.order_date) AS first_order,
  MAX(o.order_date) AS last_order,
  julianday(MAX(o.order_date)) - julianday(MIN(o.order_date)) AS days_active
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY days_active DESC;`,
    hint: "• JOIN customers with orders\n• MIN and MAX on order_date\n• julianday() calculates days between dates\n• GROUP BY customer\n• Only customers with orders",
    tests: [
      { name: "Query uses GROUP BY", validate: (q) => q.toUpperCase().includes("GROUP BY") },
      { name: "Uses MIN/MAX date functions", validate: (q) => /MIN.*date|MAX.*date/i.test(q) },
      { name: "Calculates date difference", validate: (q) => q.toLowerCase().includes("julianday") },
    ],
  },
  {
    id: "challenge-product-ranking",
    title: "7. Product Ranking",
    difficulty: "Hard",
    tags: ["Window Functions", "JOIN", "RANK"],
    database: "ecommerce",
    problem: "Rank products by the number of times they've been ordered. Show product name, order count, and rank.",
    schema: "products (id, name)\norder_items (id, order_id, product_id, quantity)",
    expectedOutput: "Product names ranked by order frequency",
    solution: `SELECT p.name, COUNT(oi.id) AS order_count,
  RANK() OVER (ORDER BY COUNT(oi.id) DESC) AS rank
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name;`,
    hint: "• LEFT JOIN products with order_items\n• COUNT(order_items.id)\n• RANK() OVER (ORDER BY count DESC)\n• GROUP BY product",
    tests: [
      { name: "Uses window function", validate: (q) => q.toUpperCase().includes("OVER") },
      { name: "Uses LEFT JOIN", validate: (q) => q.toUpperCase().includes("LEFT JOIN") },
      { name: "GROUP BY products", validate: (q) => q.toUpperCase().includes("GROUP BY") },
    ],
  },
  {
    id: "challenge-sales-dashboard",
    title: "8. Sales Dashboard",
    difficulty: "Hard",
    tags: ["CTE", "JOIN", "Aggregation", "Multi-table"],
    database: "ecommerce",
    problem: "Create a sales summary using CTEs. Show customer name, total orders, total spent, average order value, and their rank by total spent.",
    schema: "customers (id, name)\norders (id, customer_id, total)",
    expectedOutput: "Customer sales summary with ranking",
    solution: `WITH customer_stats AS (
  SELECT c.id, c.name,
    COUNT(o.id) AS total_orders,
    ROUND(SUM(o.total), 2) AS total_spent,
    ROUND(AVG(o.total), 2) AS avg_order_value
  FROM customers c
  LEFT JOIN orders o ON c.id = o.customer_id
  GROUP BY c.id, c.name
)
SELECT *,
  RANK() OVER (ORDER BY total_spent DESC) AS rank
FROM customer_stats
ORDER BY rank;`,
    hint: "• WITH cte_name AS (subquery)\n• LEFT JOIN customers with orders\n• COUNT, SUM, AVG in CTE\n• RANK() in main query",
    tests: [
      { name: "Uses CTE (WITH clause)", validate: (q) => q.toUpperCase().includes("WITH") },
      { name: "Uses window function", validate: (q) => q.toUpperCase().includes("OVER") },
      { name: "Uses JOIN", validate: (q) => q.toUpperCase().includes("JOIN") },
    ],
  },
  {
    id: "challenge-products-never-ordered",
    title: "9. Products Never Ordered",
    difficulty: "Easy",
    tags: ["LEFT JOIN", "IS NULL"],
    database: "ecommerce",
    problem: "Find all products that have never been ordered. Show product name, category, and price.",
    schema: "products (id, name, category, price)\norder_items (id, product_id)",
    expectedOutput: "Products that have 0 orders",
    solution: `SELECT p.name, p.category, p.price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL;`,
    hint: "• LEFT JOIN products with order_items\n• WHERE order_items.id IS NULL finds products with no orders\n• This is an anti-join pattern",
    tests: [
      { name: "Uses LEFT JOIN", validate: (q) => q.toUpperCase().includes("LEFT JOIN") },
      { name: "Uses IS NULL filter", validate: (q) => q.toUpperCase().includes("IS NULL") },
    ],
  },
  {
    id: "challenge-second-highest",
    title: "10. Second Highest Salary",
    difficulty: "Medium",
    tags: ["Subquery", "LIMIT", "OFFSET"],
    database: "employees",
    problem: "Find the employee with the second highest salary. Show first_name, last_name, and salary.",
    schema: "employees (first_name, last_name, salary)",
    expectedOutput: "Employee with second highest salary",
    solution: `SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`,
    hint: "• ORDER BY salary DESC\n• LIMIT 1 OFFSET 1 — skip the first result\n• Alternative: use a subquery with MAX(salary) < (SELECT MAX(salary))",
    tests: [
      { name: "Query uses ORDER BY", validate: (q) => q.toUpperCase().includes("ORDER BY") },
      { name: "Uses LIMIT/OFFSET or subquery", validate: (q) => q.toUpperCase().includes("LIMIT") || q.toUpperCase().includes("OFFSET") || q.toUpperCase().includes("MAX") },
      { name: "References salary column", validate: (q) => q.toLowerCase().includes("salary") },
    ],
  },
];
