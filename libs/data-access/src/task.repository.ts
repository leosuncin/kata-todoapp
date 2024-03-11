import { sql } from 'kysely';

import { Connection } from '@data-access/database.js';
import { pika } from '@data-access/id.js';
import { CreateTask, Task, UpdateTask } from '@data-access/task.table.js';

type FilterTasks = Partial<{
  completed: boolean;
  authorId: Task['authorId'];
  offset: number;
  limit: number;
}>;

const aliases = [
  'task_id as id',
  'task_title as title',
  'task_completed as completed',
  'task_author_id as authorId',
  'task_created_at as createdAt',
  'task_updated_at as updatedAt',
] as const;

export class TaskRepository {
  constructor(private readonly connection: Connection) {}

  createTask({
    title: task_title,
    authorId: task_author_id,
  }: CreateTask): Promise<Task> {
    return this.connection
      .insertInto('tasks')
      .values({
        task_id: pika.gen('task'),
        task_title,
        task_author_id,
      })
      .returning(aliases)
      .executeTakeFirstOrThrow();
  }

  getTasks({ offset = 0, limit = 10, ...filter }: FilterTasks = {}): Promise<
    Task[]
  > {
    const query = this.connection.selectFrom('tasks').select(aliases);

    if (typeof filter.completed === 'boolean') {
      query.where('task_completed', '=', filter.completed ? 1 : 0);
    }

    if (filter.authorId) {
      query.where('task_author_id', '=', filter.authorId);
    }

    return query.limit(limit).offset(offset).execute();
  }

  getTaskById(id: Task['id']): Promise<Task | undefined> {
    return this.connection
      .selectFrom('tasks')
      .select(aliases)
      .where('task_id', '=', id)
      .executeTakeFirst();
  }

  updateTaskById(
    id: Task['id'],
    { title: task_title, completed: task_completed }: UpdateTask,
  ): Promise<Task | undefined> {
    return this.connection
      .updateTable('tasks')
      .set({
        task_title,
        task_completed,
        task_updated_at: sql`CURRENT_TIMESTAMP`,
      })
      .where('task_id', '=', id)
      .returning(aliases)
      .executeTakeFirst();
  }

  updateTasksByAuthorId(
    authorId: Task['authorId'],
    { completed: task_completed }: Pick<Task, 'completed'>,
  ): Promise<Task[]> {
    return this.connection
      .updateTable('tasks')
      .set({ task_completed, task_updated_at: sql`CURRENT_TIMESTAMP` })
      .where('task_author_id', '=', authorId)
      .returning(aliases)
      .execute();
  }

  deleteTaskById(id: Task['id']): Promise<Task | undefined> {
    return this.connection
      .deleteFrom('tasks')
      .where('task_id', '=', id)
      .returning(aliases)
      .executeTakeFirst();
  }
}
