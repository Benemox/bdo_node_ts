# Inventory Sync API

An API to manage inventory synchronization between systems.  
Built with **Node.js**, **TypeScript**, **Express**, and **Prisma**, following **Hexagonal Architecture** principles.

---

## 📦 Features
- **POST `/inventory/sync-quantity`** – Sync inventory quantity for a SKU (create or update).
- **GET `/inventory`** – Retrieve all inventory items.
- **GET `/inventory/:sku`** – Retrieve inventory item by SKU.
- **Swagger/OpenAPI** documentation.
- **Prisma ORM** with PostgreSQL.
- **Seed script** for initial data.
- Fully **Dockerized** environment.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/bdo_node_ts.git
cd bdo_node_ts
```

### 2. Environment variables
Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/inventory?schema=public
PORT=3000
NODE_ENV=development
```

---

## 🐳 Running with Docker

```bash
docker compose up --build
```

This will start:
- `api` – Node.js application
- `db` – PostgreSQL database
- `wms` – Mock warehouse management system

---

## 📄 API Documentation
Swagger UI is available at:
```
http://localhost:3000/docs
```

---

## 🛠️ Available Commands

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Start (production)
```bash
npm start
```

### Run database migrations
```bash
npm run prisma:dev
```

### Seed database
```bash
npm run seed
```
---

## 📂 Project Structure
```
src/
 ├─ domain/                # Entities, value objects, repository interfaces
 ├─ application/           # Use cases, commands, queries
 ├─ infrastructure/        # Controllers, routes, DB repositories, scripts
 │   └─ inventory/scripts/  # seed.ts
 └─ tests/                  # Integration tests
```

---

## 📌 Tech Stack
- **Node.js** (v20)
- **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **Swagger UI**
- **Docker & Docker Compose**
- **Jest + Supertest**

---

## 👨‍💻 Author
**Abel Abbasi**  
Technical Test Project – Inventory Sync API
