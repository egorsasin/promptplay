import { MikroORM, EntityManager } from '@mikro-orm/sqlite';

let orm: MikroORM | null = null;

export function setORM(ormInstance: MikroORM): void {
  orm = ormInstance;
}

export function getORM(): MikroORM {
  if (!orm) {
    throw new Error('ORM not initialized. Make sure to call setORM() first.');
  }
  return orm;
}

export function getEM(): EntityManager {
  return getORM().em.fork();
}

export async function withTransaction<T>(
  callback: (em: EntityManager) => Promise<T>
): Promise<T> {
  const em = getEM();
  return await em.transactional(callback);
}

export function isORMInitialized(): boolean {
  return orm !== null;
}