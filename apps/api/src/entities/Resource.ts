import { Entity, PrimaryKey, Property, Collection, OneToMany, Enum } from '@mikro-orm/core';
import { Allocation } from './Allocation';
import { ResourceType } from '../types/resource.types';

@Entity()
export class Resource {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Enum(() => ResourceType)
  type!: ResourceType;

  @Property({ type: 'json' })
  skill!: string[];

  @Property({ type: 'decimal' })
  cost!: number;

  @Property({ type: 'decimal' })
  capacity!: number;

  @Property({ type: 'boolean' })
  isAvailable!: boolean;

  @Property({ type: 'datetime' })
  createdAt!: string;

  @Property({ type: 'datetime' })
  updatedAt!: string;

  @OneToMany(() => Allocation, allocation => allocation.resource)
  allocations = new Collection<Allocation>(this);

  constructor(
    id: string,
    name: string,
    description: string,
    type: ResourceType,
    skill: string[],
    cost: number,
    capacity: number,
    isAvailable: boolean,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.skill = skill;
    this.cost = cost;
    this.capacity = capacity;
    this.isAvailable = isAvailable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}