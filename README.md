# Dockerized Inventory & Order Management Web Service

Vyaparsathi is a fully containerized MERN Stack based business application designed for small businesses.  
This monorepo contains **frontend**, **backend**, **Docker**, **Nginx**, and **deployment architecture** in one place.

---

## Tech Stack

### **Backend Runtime**
- Node.js (v18+)
- Express.js 5

### **Database**
- MongoDB + Mongoose ODM

### **Authentication**
- JSON Web Tokens (JWT)
- bcryptjs (secure password hashing)

### **Security**
- helmet (secure HTTP headers)
- express-rate-limit (API rate limiting)
- cors (cross-origin security)
- compression (Gzip performance)

### **Request Handling**
- body-parser (JSON + URL encoded parsing)
- morgan (HTTP logging)

### **Utilities**
- dotenv (environment variables)
- exceljs (Excel export)

### **Developer Tools**
- prettier (code formatting)

---

## Database Models (MongoDB + Mongoose)

The backend uses three core Mongoose models: **User**, **Product**, and **Order**.  
Each model is designed for clean data flow, fast querying, and scalability.

---

# 1. User Model

### **Purpose**
Stores user authentication details, role, and ownership of products/orders.

### **Schema Fields**

- **name** — string, required  
- **email** — string, required, unique  
- **password** — string, hashed  
- **role** — string (`"admin"` or `"staff"`)  
- **createdAt** — date, auto-generated  

### **Highlights**
- Password always hashed  
- Email indexed for faster login  
- Linked to products & orders via `user` field  

---

# 2. Product Model

Represents items stored in inventory.

### **Schema Fields**

- **name** — string, required  
- **category** — string, required  
- **quantity** — number, required (current stock)  
- **price** — number, required  
- **lowStockThreshold** — number, default: 5  
- **createdAt** — date, auto-generated  
- **updatedAt** — date, updated on changes  
- **user** — ObjectId (reference to User)  

### **Notes**
- `lowStockThreshold` helps warn about shortages  
- `updatedAt` is updated on product modification  
- Stock is reduced during order creation  
- Indexed for fast text-based product search  

---

# 3. Order Model

Stores all order transactions created by users.

### **Schema Fields**

- **productId** — ObjectId (reference to Product)  
- **productName** — string (snapshot at time of order)  
- **quantity** — number, required  
- **price** — number (per unit at time of order)  
- **total** — number (price × quantity)  
- **createdAt** — date, auto-generated  
- **user** — ObjectId (reference to User)  
- **status** — string, default: "Completed"  

### **Notes**
- Contains embedded product name & price snapshot; useful even if product is updated later  
- References `Product` for relational integrity  
- Stock is automatically deducted when an order is placed  

---

#  Model Relationships

```bash
User
├── creates → Products
└── creates → Orders

Order
└── references → Product (productId)
```

- A **User** can create many **Products**  
- A **User** can create many **Orders**  
- Each **Order** is linked to exactly **one Product**  

---

#  Indexing Strategy

### User Model
- **email** is indexed  
  - Improves login speed  
  - Faster user lookups  

### Product Model
- **name** and **category** are indexed  
  - Speeds up searching/filtering products  
  - Useful for category-based queries  

### Order Model
- **createdAt** is indexed  
  - Enables fast date-wise reports  
  - Useful for analytics, history, exports  

Indexes keep queries fast even as data grows.

---

# Validation Strategy

data is validated using:
1. **Joi request validation**
2. **Mongoose schema validation**
3. **Custom controller logic (stock check, etc.)**

This multi-layer validation ensures data correctness & security.

---

## Docker Setup

The project uses Docker to containerize both the **frontend** (React/Vite + Nginx) and **backend** (Node.js + Express + MongoDB).

---

### **1. Project Docker Structure**

- **Frontend Container**
  - Builds the Vite React app
  - Serves static files using Nginx
  - Handles routing & proxies API requests → `/api`

- **Backend Container**
  - Runs Node.js Express server
  - Connects to MongoDB
  - Exposes REST APIs

- **MongoDB**
  - External MongoDB Atlas
  - No Mongo container required for cloud deployments, We used mongo 6 docker image in development environment.

---

## Running the Project with Docker Compose

The included `docker-compose.yml` to run frontend + backend containers.

### **Start all services**

docker compose up -d --build

### **Stop Containers**

docker compose down

### **Check Logs**

docker compose logs -f

### **Check Specific log of the container**

docker logs <container_name>

### **Rebuild images, containers, network**

docker compose build --no-cache

### **Restart all containers**

docker compose restart

### **Restart specific container**

docker restart <container_name>

### **List containers**

docker ps

### **List containers including stopped ones**

docker ps -a

## Monorepo Structure

```bash
/vyaparsathi/
├── frontend/
│ ├── Dockerfile
│ ├── nginx.conf
│ └── src/
│
├── backend/
│ ├── Dockerfile
│ ├── src/
│ └── routes/
│
├── docker-compose.yml
├── diagrams/
│ ├── vyaparsathi-architecture.jpg
│ ├── api-flow.jpg
│ └── docker-network.jpg
└── README.md

```

## Final Product Developed & Maintained By

#  **Tejas Tupe**

`tupetejas265@gmail.com | https://www.linkedin.com/in/tejastupe | https://github.com/Tejas-Tupe`

---

