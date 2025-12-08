# Vyaparsathi - Backend

**Vyaparsathi Backend** is the server-side infrastructure for the Vyaparsathi inventory management platform. It provides a secure, RESTful API to handle user authentication, inventory tracking, order processing, and persistent data storage for small business operations.

---

## System Architecture

The backend is built on the **Node.js** runtime using the **Express.js** framework. It follows a layered **MVC (Model-View-Controller)** architecture to separate concerns between data definitions, business logic, and routing.


                           ┌──────────────────────────────┐
                           │        Express Server        │
                           │           index.js           │
                           └───────────────┬──────────────┘
                                           │
                                           ▼
                             ┌────────────────────────┐
                             │      Route Layer       │
                             │  (API Endpoints Only)  │
                             └───────────┬────────────┘
        ┌────────────────────────────────┼──────────────────────────────────┐
        │                                │                                  │
        ▼                                ▼                                  ▼

┌─────────────────────┐      ┌───────────────────────┐       ┌───────────────────────┐
│   Auth Routes       │      │   Product Routes      │       │    Order Routes       │
│   /api/auth/*       │      │   /api/products/*     │       │    /api/orders/*      │
└──────────┬──────────┘      └──────────┬────────────┘       └──────────┬────────────┘
           │                            │                               │
           ▼                            ▼                               ▼

┌─────────────────────────┐      ┌────────────────────────┐      ┌─────────────────────────┐
│  Auth Controller        │      │  Product Overview      │      │   Order Controller      │
│  login/signup/delete ac.│      │  CRUD + Stock Mgmt     │      │  Create + Fetch Orders  │
└──────────┬──────────────┘      └──────────┬─────────────┘      └──────────┬──────────────┘
           │                                │                               │
           ▼                                ▼                               ▼

              ┌──────────────────────────────────────────────────────────┐
              │                 Core Backend Services                    │
              │  Business Logic • Validation • Error Handling • JWT      │
              └───────────────────────────┬──────────────────────────────┘
                                          │
                                          ▼
                 ┌───────────────────────────────────────────────┐
                 │            Authentication Middleware          │
                 │        (JWT Verification, Authorization)      │
                 └────────────────────────┬──────────────────────┘
                                          │
                                          ▼
                      ┌────────────────────────────────────┐
                      │          Database Layer            │
                      │              MongoDB               │
                      │     (via Mongoose ODM Models)      │
                      └──────────────────┬─────────────────┘
                                         │
              ┌──────────────────────────┼───────────────────────────┐
              │                          │                           │
              ▼                          ▼                           ▼

   ┌────────────────────┐     ┌────────────────────────┐    ┌────────────────────────┐
   │    User Model      │     │    Product Model       │    │     Order Model        │
   │  (name, email, pw) │     │  (name, price, stock)  │    │ (productId, qty, total)│
   └────────────────────┘     └────────────────────────┘    └────────────────────────┘

### Request Flow
1.  **Route:** Incoming HTTP requests are matched to defined routes.
2.  **Middleware:** Requests pass through security middleware (CORS, Helmet) and Authentication middleware (JWT verification).
3.  **Controller:** Validated requests are processed by controllers which execute business logic.
4.  **Service/Model:** Controllers interact with MongoDB via Mongoose to perform data operations.
5.  **Response:** JSON responses are standardized and sent back to the client.

---

## Technology Stack

* **Runtime Environment:** Node.js
* **Web Framework:** Express.js
* **Database:** MongoDB (NoSQL)
* **ODM (Object Data Modeling):** Mongoose
* **Authentication:** JSON Web Tokens (JWT) & bcrypt.js
* **Validation:** Joi / Mongoose Schema Validation
* **Security:** CORS, dotenv, Helmet
* **Deployment:**

---

##  Key Features & Implementation

### 1. Authentication & Security
- Stateless authentication using **JWT**.
- Passwords securely hashed using **bcrypt**.
- Protected routes enforced via custom authorization middleware.

### 2. Inventory Management
- Full **CRUD** operations for product management.
- Schema validations using Mongoose models:
  - Stock cannot be negative.
  - Price must be numeric.
  - Required fields enforced.

### 3. Atomic Order Processing
- Concurrency-safe stock deduction using MongoDB **atomic operators (`$inc`)**.
- Prevents race conditions during simultaneous orders.
- Ensures consistent inventory state.

---

## 4. API Endpoints Overview

---

### **1. Authentication Routes**

| Method | Endpoint                           | Description                     |
|--------|------------------------------------|---------------------------------|
| POST   | `/auth/signup`                     | Register a new user             |
| POST   | `/auth/login`                      | Login user & return JWT         |
| POST   | `/auth/changepassword`             | Change user password (Protected)|
| DELETE | `/auth/deleteaccount`              | Delete user account (Protected) |
| PATCH  | `/auth/editprofile`                | Edit user profile (Protected)   |

---

### **2. User Routes**

| Method | Endpoint                 | Description                              |
|--------|--------------------------|------------------------------------------|
| GET    | `/users/userdetails`     | Fetch logged-in user details (Protected) |

---

### **3. Product & Stock Routes**

| Method | Endpoint                          | Description                                        |
|--------|-----------------------------------|----------------------------------------------------|
| GET    | `/products`                       | Get all products (Protected)                       |
| POST   | `/stocks/add`                     | Add new stock entry for a product (Protected)      |
| POST   | `/stocks/refill`                  | Refill inventory for a product (Protected)         |
| GET    | `/products/productsoverview`      | Fetch all products with overview details(Protected)|
| GET    | `/products/overview`              | Get complete product summary (Protected)           |
| DELETE | `/products/delete`                | Delete product (Protected)                         |

---

### **4. Order Routes**

| Method | Endpoint                    | Description                                   |
|--------|-----------------------------|-----------------------------------------------|
| POST   | `/orders/create`            | Create a new order + auto deduct stock        |
| GET    | `/orders/myorders`          | Fetch all orders of the logged-in user        |
| GET    | `/orders/export`            | Export all orders as downloadable file        |
| DELETE | `/orders/delete`            | Delete all orders (Protected)                 |

---

### **5. System Routes**

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| GET    | `/health`    | Server health check route |

---

## 5. Database Models

### User Model
- Stores authentication credentials and business profile.
- Fields: `username`, `email`, `password` (hashed), `businessName`, `etc`.

### Product Model
- Represents individual inventory items.
- Fields: `name`, `category`, `price`, `stock`, `unit`, `etc`.

### Order Model
- Records transaction history and links to products.
- Fields: `customerName`, `products`, `totalAmount`, `date`, `etc`.

---

## Folder Structure

The project is modularized to ensure scalability and ease of maintenance.

```bash
Backend/
│
├── Config/
│   ├── Database/
│   │   ├── Models/
│   │   ├── Ordermodel.js
│   │   ├── Productmodel.js
│   │   └── Usermodel.js
│   │
│   └── db.js
│
├── validateEnv.js
│
├── Controllers/
│
├── Joi Schemas/
│
├── Middlewares/
│
├── Routes/
│
├── index.js
├── package.json
├── package-lock.json
├── .dockerignore
├── Dockerfile
├── .prettierignore
├── .prettierrc
├── .env
└── README.md


