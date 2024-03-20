import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

import { UserTable } from '@data-access/user.table.js';
import { TransformObjectPropertiesRemovePrefixAndCamelizeThem } from '@data-access/types.js';

export interface TaskTable {
  task_id: `task_${string}`;
  task_title: string;
  task_completed: ColumnType<boolean, false | undefined, boolean | undefined>;
  task_author_id: UserTable['user_id'];
  task_created_at: ColumnType<Date, never, never>;
  task_updated_at: ColumnType<Date, never, string | undefined>;
}

export type Task = TransformObjectPropertiesRemovePrefixAndCamelizeThem<
  Selectable<TaskTable>
>;

export type CreateTask = TransformObjectPropertiesRemovePrefixAndCamelizeThem<
  Pick<Insertable<TaskTable>, 'task_title' | 'task_author_id'>
>;

export type UpdateTask = TransformObjectPropertiesRemovePrefixAndCamelizeThem<
  Pick<Updateable<TaskTable>, 'task_completed' | 'task_title'>
>;
