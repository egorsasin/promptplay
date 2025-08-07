import { EntityManager } from '@mikro-orm/sqlite';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '../entities/Project';
import { Resource } from '../entities/Resource';
import { ProjectStatus, ProjectPriority } from '../types/project.types';
import { ResourceType } from '../types/resource.types';

export async function seedDatabase(em: EntityManager): Promise<void> {
  console.log('🌱 Starting database seeding...');

  // Check if data already exists
  const projectCount = await em.count(Project);
  const resourceCount = await em.count(Resource);

  if (projectCount > 0 || resourceCount > 0) {
    console.log('📊 Database already contains data, skipping seeding');
    return;
  }

  // Seed Projects
  const projects = [
    new Project(
      '550e8400-e29b-41d4-a716-446655440000',
      'Website Redesign',
      'Complete redesign of company website with modern UI/UX',
      '2024-02-01',
      '2024-04-30',
      15000,
      ProjectStatus.ACTIVE,
      ProjectPriority.HIGH,
      '2024-01-15T10:00:00.000Z',
      '2024-01-15T10:00:00.000Z'
    ),
    new Project(
      '550e8400-e29b-41d4-a716-446655440001',
      'Mobile App Development',
      'Native mobile application for iOS and Android platforms',
      '2024-03-15',
      '2024-08-15',
      45000,
      ProjectStatus.ACTIVE,
      ProjectPriority.CRITICAL,
      '2024-01-20T14:30:00.000Z',
      '2024-01-25T09:15:00.000Z'
    ),
    new Project(
      '550e8400-e29b-41d4-a716-446655440002',
      'Database Migration',
      'Migrate legacy database to modern cloud infrastructure',
      '2024-01-10',
      '2024-02-28',
      8500,
      ProjectStatus.COMPLETED,
      ProjectPriority.MEDIUM,
      '2024-01-05T08:00:00.000Z',
      '2024-02-28T16:45:00.000Z'
    ),
    new Project(
      '550e8400-e29b-41d4-a716-446655440003',
      'Marketing Campaign',
      'Q2 digital marketing campaign across multiple channels',
      '2024-04-01',
      '2024-06-30',
      12000,
      ProjectStatus.ON_HOLD,
      ProjectPriority.LOW,
      '2024-01-30T11:20:00.000Z',
      '2024-01-30T11:20:00.000Z'
    ),
    new Project(
      '550e8400-e29b-41d4-a716-446655440004',
      'Security Audit',
      'Comprehensive security assessment and vulnerability testing',
      '2024-05-01',
      '2024-05-31',
      7500,
      ProjectStatus.INACTIVE,
      ProjectPriority.HIGH,
      '2024-02-01T13:10:00.000Z',
      '2024-02-01T13:10:00.000Z'
    ),
  ];

  // Seed Resources
  const resources = [
    // Person resources
    new Resource(
      '660e8400-e29b-41d4-a716-446655440000',
      'John Smith',
      'Senior Full-Stack Developer with expertise in React and Node.js',
      ResourceType.PERSON,
      ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
      85,
      40,
      true,
      '2024-01-15T10:00:00.000Z',
      '2024-01-15T10:00:00.000Z'
    ),
    new Resource(
      '660e8400-e29b-41d4-a716-446655440001',
      'Sarah Johnson',
      'UX/UI Designer specializing in mobile and web applications',
      ResourceType.PERSON,
      ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      75,
      35,
      true,
      '2024-01-20T14:30:00.000Z',
      '2024-01-25T09:15:00.000Z'
    ),
    new Resource(
      '660e8400-e29b-41d4-a716-446655440002',
      'Mike Chen',
      'DevOps Engineer with cloud infrastructure expertise',
      ResourceType.PERSON,
      ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux'],
      90,
      40,
      false,
      '2024-01-05T08:00:00.000Z',
      '2024-02-28T16:45:00.000Z'
    ),
    new Resource(
      '660e8400-e29b-41d4-a716-446655440003',
      'Emily Davis',
      'Project Manager with Agile and Scrum certification',
      ResourceType.PERSON,
      ['Project Management', 'Agile', 'Scrum', 'JIRA', 'Risk Management', 'Team Leadership'],
      70,
      40,
      true,
      '2024-01-30T11:20:00.000Z',
      '2024-01-30T11:20:00.000Z'
    ),
    // Hardware resources
    new Resource(
      '660e8400-e29b-41d4-a716-446655440004',
      'MacBook Pro M3',
      'High-performance laptop for development work',
      ResourceType.HARDWARE,
      ['Development', 'Design', 'Video Editing', 'iOS Development'],
      50,
      1,
      true,
      '2024-02-01T13:10:00.000Z',
      '2024-02-01T13:10:00.000Z'
    ),
    new Resource(
      '660e8400-e29b-41d4-a716-446655440005',
      'Dell PowerEdge Server',
      'Production server for hosting applications',
      ResourceType.HARDWARE,
      ['Web Hosting', 'Database Hosting', 'API Hosting', 'Load Balancing'],
      200,
      100,
      true,
      '2024-02-05T09:00:00.000Z',
      '2024-02-05T09:00:00.000Z'
    ),
    // Software resources
    new Resource(
      '660e8400-e29b-41d4-a716-446655440008',
      'Adobe Creative Cloud',
      'Complete suite of creative applications',
      ResourceType.SOFTWARE,
      ['Graphic Design', 'Video Editing', 'Photo Editing', 'UI Design', 'Animation'],
      60,
      5,
      true,
      '2024-02-15T08:15:00.000Z',
      '2024-02-15T08:15:00.000Z'
    ),
    new Resource(
      '660e8400-e29b-41d4-a716-446655440009',
      'JetBrains IntelliJ IDEA',
      'Professional IDE for Java and other languages',
      ResourceType.SOFTWARE,
      ['Java Development', 'Kotlin Development', 'Spring Framework', 'Debugging'],
      15,
      10,
      true,
      '2024-02-18T12:00:00.000Z',
      '2024-02-18T12:00:00.000Z'
    ),
  ];

  // Persist projects
  for (const project of projects) {
    em.persist(project);
  }

  // Persist resources
  for (const resource of resources) {
    em.persist(resource);
  }

  await em.flush();
  console.log(`✅ Seeded ${projects.length} projects and ${resources.length} resources`);
}