import { Entity, PrimaryKey, Property, Collection, OneToMany, Rel, Enum } from '@mikro-orm/core';
import { Allocation } from './Allocation';
import { ProjectStatus, ProjectPriority } from '../types/project.types';

@Entity()
export class Project {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'date' })
  startDate!: string;

  @Property({ type: 'date' })
  endDate!: string;

  @Property({ type: 'decimal' })
  cost!: number;

  @Enum(() => ProjectStatus)
  status!: ProjectStatus;

  @Enum(() => ProjectPriority)
  priority!: ProjectPriority;

  @Property({ type: 'datetime' })
  createdAt!: string;

  @Property({ type: 'datetime' })
  updatedAt!: string;

  @OneToMany(() => Allocation, allocation => allocation.project)
  allocations = new Collection<Rel<Allocation>>(this);

  constructor(
    id: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    cost: number,
    status: ProjectStatus,
    priority: ProjectPriority,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.cost = cost;
    this.status = status;
    this.priority = priority;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}