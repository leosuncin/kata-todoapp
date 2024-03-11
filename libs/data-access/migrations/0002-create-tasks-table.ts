import { Kysely, sql } from 'kysely';

import { Database } from '@data-access/database.js';

export async function up(db: Kysely<Database>) {
  await db.schema
    .createTable('tasks')
    .addColumn('task_id', 'text', (column) => column.primaryKey().notNull())
    .addColumn('task_title', 'text', (column) => column.notNull())
    .addColumn('task_completed', 'binary', (column) =>
      column.notNull().defaultTo(0),
    )
    .addColumn('task_author_id', 'text', (column) =>
      column
        .notNull()
        .references('users.user_id')
        .onUpdate('cascade')
        .onDelete('cascade'),
    )
    .addColumn('task_created_at', 'timestamp', (column) =>
      column.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('task_updated_at', 'timestamp', (column) =>
      column.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addCheckConstraint('check_task_id', sql`task_id LIKE 'task_%'`)
    .addCheckConstraint('check_task_title', sql`LENGTH(task_title) > 0`)
    .execute();
}

export async function down(db: Kysely<Database>) {
  await db.schema.dropTable('tasks').execute();
}
