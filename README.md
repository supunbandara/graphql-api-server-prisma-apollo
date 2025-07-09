# CourseHub GraphQL API

A modular, scalable GraphQL API built with **Apollo Server**, **Prisma ORM**, and **PostgreSQL**. This project follows the **schema-first approach** with best practices for **authentication**, **authorization**, **validation**, and handling **N+1 queries** via **DataLoader**.

---

## Features

- Schema-First GraphQL API using SDL
- JWT-based authentication with role-based authorization (graphql-shield)
- Modular structure for scalable schema & resolvers
- Optimized with DataLoader to avoid N+1 query problem
- Input validation middleware
- Prisma ORM + PostgreSQL

---

## Tech Stack

| Layer              | Tool/Library                     |
|--------------------|----------------------------------|
| API Server         | Apollo Server (Express)          |
| ORM                | Prisma                           |
| Database           | PostgreSQL                       |
| Validation         | `validator`, `password-validator`|
| Auth               | `jsonwebtoken`, `graphql-shield` |
| Loader             | Facebook’s `DataLoader`          |
| Language/Runtime   | Node.js with ES Modules          |

---

## Folder Structure

src/
├── api/ # Modular APIs (course, instructor, user, auth)
│ ├── course/ # Course GraphQL schema, resolvers, permissions
│ ├── instructor/ # Instructor schema, services
│ └── ...
├── utils/ # JWT utils, validation rules, graphql-shield
├── dataloaders/ # Batch loaders to solve N+1
├── services/ # Prisma service layers
├── server.js # Main Apollo server setup
└── api/index.js # ApiExplorer for schema aggregation

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/coursehub-graphql-api.git
cd coursehub-graphql-api

npm install

DATABASE_URL=postgresql://user:password@localhost:5432/coursehub
JWT_SECRET=your_jwt_secret

npx prisma generate
npx prisma migrate dev --name init

npm run dev
