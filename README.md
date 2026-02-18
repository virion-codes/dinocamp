# Dino Camp Roster

Full-stack app: React frontend (Vite + TypeScript) and Express backend with a PostgreSQL database. View and edit users from the DB in the browser.

## Project structure

- **`frontend/`** — React app (Vite, TypeScript, shadcn/ui, Tailwind)
- **`backend/`** — Express API and Postgres connection
- **`database/`** — SQL scripts: `schema.sql` (users table), `seed.sql` (sample data)

## Prerequisites

- Node.js & npm
- PostgreSQL (local or remote)

## Setup

### 1. Database

Create the database and run the scripts:

```sh
psql -U postgres -c "CREATE DATABASE dinocamp;"
psql -U postgres -d dinocamp -f database/schema.sql
psql -U postgres -d dinocamp -f database/seed.sql
```

### 2. Backend env

Copy or edit `backend/.env` with your Postgres settings:

```env
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=dinocamp
```

### 3. Install and run

From the project root:

```sh
# Install frontend and backend dependencies
npm install --prefix frontend
npm install --prefix backend

# Start backend (port 3000)
npm run dev:backend

# In another terminal: start frontend (http://localhost:8080)
npm run dev
```

Or run each app from its folder:

```sh
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

## Scripts (from root)

| Script          | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start frontend on port 8080    |
| `npm run dev:frontend` | Same as `dev`           |
| `npm run dev:backend` | Start Express API on port 3000 |
| `npm run build` | Build frontend for production  |

## API (backend)

- `GET /api/health` — Health check
- `GET /api/users` — List all users
- `GET /api/users/:id` — Get one user
- `PUT /api/users/:id` — Update user (body: `{ "name": "...", "email": "..." }`)

## Tech stack

- **Frontend:** Vite, React, TypeScript, TanStack Query, shadcn/ui, Tailwind CSS
- **Backend:** Express, Node.js (ES modules)
- **Database:** PostgreSQL (`pg`)
