/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import projectRoutes from './routes/project.routes';
import { MikroORM, RequestContext } from '@mikro-orm/sqlite';
import config from './mikro-orm.config';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

let orm: MikroORM;
// Initialize MikroORM
async function initializeDatabase() {
  try {
    orm = await MikroORM.init(config);
    console.log('Database connected successfully');

    // Generate schema (creates tables if they don't exist)
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    console.log('Database schema updated successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

// Middleware to provide ORM context for each request
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to staffing API!' });
});

app.get('/api/health', (req, res) => {
  res.send({ status: 'OK', database: 'connected' });
});

// Project routes
app.use('/api/projects', projectRoutes);

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
