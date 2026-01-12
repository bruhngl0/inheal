import { Pool, PoolConfig } from 'pg';

let pool: Pool;

const dbConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 10, // Reduced to prevent hitting cloud limits
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased to 10s for reliability
};

if (!process.env.DATABASE_URL) {
  console.log('⚠️ Using LOCAL database');
  dbConfig.host = process.env.DB_HOST || 'localhost';
  // ... rest of your local config
} else {
  // Enhanced SSL config for Cloud/Neon
  dbConfig.ssl = {
    rejectUnauthorized: false,
  };
}

// Singleton pattern logic
if (process.env.NODE_ENV === 'production') {
  pool = new Pool(dbConfig);
} else {
  let globalWithPool = global as typeof globalThis & {
    postgresPool?: Pool;
  };
  if (!globalWithPool.postgresPool) {
    globalWithPool.postgresPool = new Pool(dbConfig);
  }
  pool = globalWithPool.postgresPool;
}

// Add an error listener to the pool to prevent the app from crashing
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;