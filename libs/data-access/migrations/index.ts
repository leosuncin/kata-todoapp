import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { exit } from 'node:process';

import { FileMigrationProvider, Kysely, Migrator } from 'kysely';

import { Database } from '@data-access/database.js';

export async function migrateToLatest(db: Kysely<Database>) {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: import.meta.dirname,
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  if (error) {
    console.error(error);
    exit(1);
  } else {
    for (const result of results!) {
      if (result.status === 'Success') {
        console.log(
          `migration "${result.migrationName}" was executed successfully`,
        );
      } else if (result.status === 'Error') {
        console.error(`failed to execute migration "${result.migrationName}"`);
      }
    }
  }
}
