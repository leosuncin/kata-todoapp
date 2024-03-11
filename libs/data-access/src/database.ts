import { Kysely } from 'kysely';

import { TaskTable } from '@data-access/task.table.js';
import { UserTable } from '@data-access/user.table.js';

export interface Database {
  users: UserTable;
  tasks: TaskTable;
}

export type Connection = Kysely<Database>;
