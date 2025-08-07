import { defineConfig } from '@mikro-orm/sqlite';
import { Project } from './entities/Project';
import { Resource } from './entities/Resource';
import { Allocation } from './entities/Allocation';

export default defineConfig({
  entities: [Project, Resource, Allocation],
  dbName: process.env.DATABASE_NAME || 'staffing.sqlite',
  debug: process.env.NODE_ENV !== 'production',
  
  // Connection pooling configuration
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 60000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200,
  },
  
  // Logging configuration
  logger: (message: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[MikroORM] ${message}`);
    }
  },
  
  // Performance optimizations
  forceEntityConstructor: true,
  validate: true,
  strict: true,
  
  // Migration settings
  migrations: {
    path: './src/migrations',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: false,
    safe: true,
    emit: 'ts',
  },
});