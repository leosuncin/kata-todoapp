import * as assert from 'node:assert/strict';
import { test } from 'node:test';

import * as fc from 'fast-check';

import { CreateTask, Task, UpdateTask } from '@schemas/task.js';

const taskArbitrary: fc.Arbitrary<Task> = fc.record({
  id: fc.string({ minLength: 1 }).map((id) => `task_${id}`),
  title: fc.string({ minLength: 1 }).filter((title) => title.trim().length > 0),
  authorId: fc.string({ minLength: 1 }).map((id) => `user_${id}`),
  completed: fc.boolean(),
  createdAt: fc.date(),
  updatedAt: fc.date(),
});
const taskInvalidArbitrary = fc.record(
  {
    id: fc.string(),
    // eslint-disable-next-line unicorn/no-null
    title: fc.oneof(fc.constant(null), fc.constant(''), fc.constant(' ')),
    authorId: fc.string(),
    completed: fc.integer({ min: 0, max: 1 }),
    createdAt: fc.string(),
    updatedAt: fc.string(),
  },
  { withDeletedKeys: true },
);

test('validate task data', () =>
  fc.assert(
    fc.property(taskArbitrary, (data) => {
      const result = Task.safeParse(data);

      assert.ok(result.success);
    }),
  ));

test('reject invalid task data', () =>
  fc.assert(
    fc.property(taskInvalidArbitrary, (data) => {
      const result = Task.safeParse(data);

      assert.ok(result.success === false);
    }),
  ));

test('validate create task data', () =>
  fc.assert(
    fc.property(taskArbitrary, (data) => {
      const result = CreateTask.safeParse(data);

      assert.ok(result.success);
    }),
  ));

test('validate update task data', () =>
  fc.assert(
    fc.property(taskArbitrary, (data) => {
      const result = UpdateTask.safeParse(data);

      assert.ok(result.success);
    }),
  ));

test('reject invalid update task data', () =>
  fc.assert(
    fc.property(taskInvalidArbitrary, (data) => {
      const result = UpdateTask.safeParse(data);

      assert.ok(result.success === false);
    }),
  ));
