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

```
src/
├── api/                     # GraphQL modules (schema, resolvers, permissions)
│   ├── auth/                # Login, signup, update profile
│   ├── course/              # Course typeDefs, resolvers, permissions
│   ├── instructor/          # Instructor-related API logic
│   └── user/                # User management
├── dataloaders/            # Handles N+1 batching (e.g., UserDataLoader)
├── services/               # Prisma-based service layer
├── utils/                  # JWT, validation, GraphQL Shield rules
│   ├── jwt.js              # Token generation & verification
│   ├── shield.js           # Role-based access control
│   └── validation.js
├── api/index.js            # ApiExplorer (schema + resolver aggregator)
├── server.js               # Apollo Server + Express + Context setup
└── prisma/
    ├── schema.prisma       # Prisma DB schema
    └── migrations/         # Auto-generated migration files
```

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/coursehub-graphql-api.git
cd coursehub-graphql-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/coursehub
JWT_SECRET=your_jwt_secret
```

### 4. Generate Prisma Client & Migrate

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the server
   
```bash
npm run dev
```
