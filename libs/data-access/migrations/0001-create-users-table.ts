import { Kysely, sql } from 'kysely';

import { Database } from '@data-access/database.js';

export async function up(db: Kysely<Database>) {
  await db.schema
    .createTable('users')
    .addColumn('user_id', 'text', (column) => column.primaryKey().notNull())
    .addColumn('user_username', 'text', (column) => column.unique().notNull())
    .addColumn('user_password', 'text', (column) => column.notNull())
    .addColumn('user_bio', 'text')
    .addColumn('user_created_at', 'timestamp', (column) =>
      column.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('user_updated_at', 'timestamp', (column) =>
      column.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addCheckConstraint('check_user_id', sql`user_id LIKE 'user_%'`)
    .addCheckConstraint('check_user_username', sql`LENGTH(user_username) > 0`)
    .execute();
}

export async function down(db: Kysely<Database>) {
  await db.schema.dropTable('users').execute();
}
