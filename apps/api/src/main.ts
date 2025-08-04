/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import projectRoutes from './routes/project.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

// Project routes
app.use('/api/projects', projectRoutes);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
  console.log(`Project endpoints available at http://localhost:${port}/api/projects`);
});
server.on('error', console.error);
