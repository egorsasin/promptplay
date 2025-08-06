import { defineConfig } from '@mikro-orm/sqlite';
import { Project } from './entities/Project';
import { Resource } from './entities/Resource';
import { Allocation } from './entities/Allocation';

export default defineConfig({
  entities: [Project, Resource, Allocation],
  dbName: 'staffing.sqlite',
  debug: process.env.NODE_ENV !== 'production',
});