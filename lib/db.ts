import { Pool, PoolConfig } from 'pg';

let pool: Pool;

const dbConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  // If we don't have a connection string, we could fall back to individual vars, 
  // but we expect DATABASE_URL to be set for the migration.
  // We keep the old config styles as fallback just in case or remove them if we are sure.
  // Given the user instruction, we'll rely on DATABASE_URL.
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// If no DATABASE_URL, check for old variables (optional, but good for safety if we revert env)
if (!process.env.DATABASE_URL) {
  console.log('⚠️  Using LOCAL database configuration (fallback)');
  // This part is legacy fallback
  dbConfig.host = process.env.DB_HOST || 'localhost';
  dbConfig.port = parseInt(process.env.DB_PORT || '5432');
  dbConfig.database = process.env.DB_NAME || 'inheal';
  dbConfig.user = process.env.DB_USER || 'postgres';
  dbConfig.password = process.env.DB_PASSWORD || '';
} else {
  console.log('✅  Using CLOUD database configuration (DATABASE_URL)');
  // Neon requires SSL. The connection string includes sslmode=require, 
  // but explicit ssl config ensures it works in Node.
  dbConfig.ssl = true;
}


if (process.env.NODE_ENV === 'production') {
  pool = new Pool(dbConfig);
} else {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithPool = global as typeof globalThis & {
    postgresPool?: Pool;
  };

  if (!globalWithPool.postgresPool) {
    globalWithPool.postgresPool = new Pool(dbConfig);
  }
  pool = globalWithPool.postgresPool;
}

export default pool;
