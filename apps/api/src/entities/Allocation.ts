import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import type { Rel } from '@mikro-orm/core'
import { Project } from './Project';
import { Resource } from './Resource';

@Entity()
export class Allocation {
  @PrimaryKey()
  id!: string;

  @ManyToOne(() => Project)
  project!: Rel<Project>;

  @ManyToOne(() => Resource)
  resource!: Rel<Resource>;

  @Property({ type: 'decimal' })
  percentage!: number;

  @Property({ type: 'date' })
  startDate!: string;

  @Property({ type: 'date', nullable: true })
  endDate?: string;

  @Property({ type: 'decimal' })
  cost!: number;

  @Property({ type: 'datetime' })
  createdAt!: string;

  @Property({ type: 'datetime' })
  updatedAt!: string;

  constructor(
    id: string,
    project: Rel<Project>,
    resource: Rel<Resource>,
    percentage: number,
    startDate: string,
    cost: number,
    createdAt: string,
    updatedAt: string,
    endDate?: string
  ) {
    this.id = id;
    this.project = project;
    this.resource = resource;
    this.percentage = percentage;
    this.startDate = startDate;
    this.cost = cost;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.endDate = endDate;
  }
}