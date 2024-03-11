import * as assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

import { Database } from '@data-access/database.js';
import { TaskRepository } from '@data-access/task.repository.js';
import * as createUsersTableMigration from '@migrations/0001-create-users-table.js';
import * as createTasksTableMigration from '@migrations/0002-create-tasks-table.js';

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;
  let connection: Kysely<Database>;

  beforeEach(async () => {
    connection = new Kysely<Database>({
      dialect: new SqliteDialect({
        database: new SQLite(':memory:'),
      }),
    });

    await createUsersTableMigration.up(connection);
    await createTasksTableMigration.up(connection);
    await connection
      .insertInto('users')
      .values({
        user_id: 'user_test',
        user_username: 'user_test',
        user_password: 'testpassword',
      })
      .onConflict((qb) => qb.doNothing())
      .execute();

    taskRepository = new TaskRepository(connection);
  });

  afterEach(async () => {
    await createTasksTableMigration.down(connection);
    await createUsersTableMigration.down(connection);
    await connection.destroy();
  });

  it('create a task', async () => {
    const task = await taskRepository.createTask({
      title: 'test task',
      authorId: 'user_test',
    });

    assert.ok(task);
    assert.equal(task.title, 'test task');
    assert.match(task.id, /task_\w+/);
    assert.equal(task.completed, 0);
  });

  it('get tasks', async () => {
    const tasks = await taskRepository.getTasks();

    assert.ok(Array.isArray(tasks));
  });

  it('get a task by id', async () => {
    const task = await taskRepository.createTask({
      title: 'test task',
      authorId: 'user_test',
    });

    const foundTask = await taskRepository.getTaskById(task.id);

    assert.ok(foundTask);
    assert.equal(foundTask.title, 'test task');
    assert.equal(foundTask.id, task.id);
  });

  it('get tasks by author id', async () => {
    await taskRepository.createTask({
      title: 'test task',
      authorId: 'user_test',
    });

    const tasks = await taskRepository.getTasks({ authorId: 'user_test' });

    assert.ok(Array.isArray(tasks));
    assert.equal(tasks.length, 1);
  });

  it('update a task by id', async () => {
    const task = await taskRepository.createTask({
      title: 'test task',
      authorId: 'user_test',
    });

    const updatedTask = await taskRepository.updateTaskById(task.id, {
      title: 'updated task',
      completed: 1,
    });

    assert.ok(updatedTask);
    assert.equal(updatedTask.title, 'updated task');
    assert.equal(updatedTask.completed, 1);
  });

  it('update tasks by author id', async () => {
    await taskRepository.createTask({
      title: 'test task',
      authorId: 'user_test',
    });

    const updatedTasks = await taskRepository.updateTasksByAuthorId(
      'user_test',
      {
        completed: 1,
      },
    );

    assert.ok(Array.isArray(updatedTasks));
    assert.equal(updatedTasks.length, 1);
    assert.ok(updatedTasks.every((task) => task.completed === 1));
  });

  it('delete a task by id', async () => {
    const task = await taskRepository.createTask({
      title: 'test task',
      authorId: 'user_test',
    });

    const deletedTask = await taskRepository.deleteTaskById(task.id);

    assert.ok(deletedTask);
    assert.equal(deletedTask.title, 'test task');
  });
});
