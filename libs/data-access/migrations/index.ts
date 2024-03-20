import { debuglog, inspect } from 'node:util';

import { type Kysely, Migrator, MigrationProvider } from 'kysely';

import type { Database } from '@data-access/database.js';

const debug = debuglog('todoapp:migrations');

class LocalMigrationProvider implements MigrationProvider {
  async getMigrations() {
    return {
      '0001-create-users-table': await import(
        '@migrations/0001-create-users-table.js'
      ),
      '0002-create-tasks-table': await import(
        '@migrations/0002-create-tasks-table.js'
      ),
    };
  }
}

export function createMigrator(db: Kysely<Database>) {
  return new Migrator({
    db,
    provider: new LocalMigrationProvider(),
  });
}

export async function migrateToLatest(db: Kysely<Database>) {
  const { error, results } = await createMigrator(db).migrateToLatest();

  if (error) {
    debug(inspect(error));
  } else {
    for (const result of results!) {
      if (result.status === 'Success') {
        debug(`migration "${result.migrationName}" was executed successfully`);
      } else if (result.status === 'Error') {
        debug(`failed to execute migration "${result.migrationName}"`);
      }
    }
  }
}
