/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import projectRoutes from './routes/project.routes';
import resourceRoutes from './routes/resource.routes';

import { MikroORM, RequestContext } from '@mikro-orm/sqlite';
import config from './mikro-orm.config';
import { setORM } from './utils/database.utils';
import { seedDatabase } from './utils/seeder.utils';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

let orm: MikroORM;

// Initialize MikroORM with enhanced error handling and logging
async function initializeDatabase(): Promise<void> {
  try {
    console.log('Initializing database connection...');
    orm = await MikroORM.init(config);
    console.log('✅ Database connected successfully');

    // Set ORM instance for global access
    setORM(orm);

    // Generate schema (creates tables if they don't exist)
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    console.log('✅ Database schema updated successfully');

    // Seed database with initial data
    await seedDatabase(orm.em.fork());
    console.log('✅ Database seeding completed');

    // Log database info
    console.log(`📊 Database: ${config.dbName}`);
    console.log(`🔧 Database type: SQLite`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Middleware to provide ORM context for each request with error handling
app.use((req, res, next) => {
  if (!orm) {
    return res.status(503).json({
      success: false,
      message: 'Database not initialized',
      error: 'Service temporarily unavailable'
    });
  }
  RequestContext.create(orm.em, next);
});

// Global error handler for database operations
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error.name === 'ValidationError' || error.name === 'ConstraintViolationException') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.message
    });
  }
  
  if (error.name === 'NotFoundError') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
      error: error.message
    });
  }

  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
  });
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to staffing API!' });
});

app.get('/api/health', (req, res) => {
  res.send({ status: 'OK', database: 'connected' });
});

// Project routes
app.use('/api/projects', projectRoutes);

// Resource routes
app.use('/api/resources', resourceRoutes);

const port = process.env.PORT || 3333;

// Start server after database initialization
initializeDatabase().then(() => {
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
    console.log(
      `Project endpoints available at http://localhost:${port}/api/projects`
    );
  });
  server.on('error', console.error);
});
