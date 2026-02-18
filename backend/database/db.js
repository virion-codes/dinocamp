import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Connection must match database/schema.sql: table "users" (id, email, name, created_at)
const poolConfig =
  process.env.DATABASE_URL && !process.env.PGHOST
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.PGHOST ?? 'localhost',
        port: Number(process.env.PGPORT) || 5432,
        user: process.env.PGUSER ?? 'postgres',
        password: process.env.PGPASSWORD || undefined,
        database: process.env.PGDATABASE ?? 'dinocamp',
      };

const pool = new Pool(poolConfig);

export default pool;
