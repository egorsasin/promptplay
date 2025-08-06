import { Entity, PrimaryKey, Property, Collection, OneToMany, Rel } from '@mikro-orm/core';
import { Allocation } from './Allocation';

@Entity()
export class Project {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  startDate!: Date;

  @Property({ nullable: true })
  endDate?: Date;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Allocation, allocation => allocation.project)
  allocations = new Collection<Rel<Allocation>>(this);

  constructor(name: string, startDate: Date, description?: string, endDate?: Date) {
    this.name = name;
    this.startDate = startDate;
    this.description = description;
    this.endDate = endDate;
  }
}