import { Entity, PrimaryKey, Property, Collection, OneToMany } from '@mikro-orm/core';
import { Allocation } from './Allocation';

@Entity()
export class Resource {
  @PrimaryKey()
  id!: number;

  @Property()
  type!: string;

  @Property()
  skill!: string;

  @Property({ type: 'decimal' })
  cost!: number;

  @Property({ type: 'decimal' })
  capacity!: number;

  @OneToMany(() => Allocation, allocation => allocation.resource)
  allocations = new Collection<Allocation>(this);

  constructor(type: string, skill: string, cost: number, capacity: number) {
    this.type = type;
    this.skill = skill;
    this.cost = cost;
    this.capacity = capacity;
  }
}