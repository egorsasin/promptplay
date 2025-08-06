import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import type { Rel } from '@mikro-orm/core'
import { Project } from './Project';
import { Resource } from './Resource';

@Entity()
export class Allocation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Project)
  project!: Rel<Project>;

  @ManyToOne(() => Resource)
  resource!: Rel<Resource>;

  @Property({ type: 'decimal' })
  percentage!: number;

  @Property()
  startDate!: Date;

  @Property({ nullable: true })
  endDate?: Date;

  @Property({ type: 'decimal' })
  cost!: number;

  constructor(project: any, resource: any, percentage: number, startDate: Date, cost: number, endDate?: Date) {
    this.project = project;
    this.resource = resource;
    this.percentage = percentage;
    this.startDate = startDate;
    this.cost = cost;
    this.endDate = endDate;
  }
}