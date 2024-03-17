import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  assertCreateTask,
  assertTask,
  assertUpdateTask,
  isTask,
  randomCreateTask,
  randomTask,
  randomUpdateTask,
  validateCreateTask,
  validateTask,
  validateUpdateTask,
} from './task.js';

describe('Task', () => {
  it('create a random task', () => {
    const task = randomTask();

    assert.ok(task);
    assert.equal(typeof task.id, 'string');
    assert.equal(typeof task.title, 'string');
    assert.equal(typeof task.completed, 'boolean');
    assert.ok(task.createdAt instanceof Date);
    assert.ok(task.updatedAt instanceof Date);
  });

  it('check whether is a task or not', () => {
    const task = randomTask();

    assert.ok(isTask(task));
  });

  it('assert that is a task', () => {
    const task = randomTask();

    assert.doesNotThrow(() => {
      assert.ok(assertTask(task));
    });

    assert.throws(() => {
      assert.ok(assertTask({ ...task, id: 'invalid_id' }));
    });
  });

  it('validate a task', () => {
    const task = randomTask();

    const valid = validateTask(task);

    assert.ok(valid.success);
    assert.deepEqual(valid.data, task);

    const invalid = validateTask({ ...task, id: 'invalid_id' });

    assert.ok(!invalid.success);
    assert.equal(invalid.errors.length, 1);
  });
});

describe('CreateTask', () => {
  it('create a random create task', () => {
    const createTask = randomCreateTask();

    assert.ok(createTask);
    assert.equal(typeof createTask.title, 'string');
    assert.equal(typeof createTask.authorId, 'string');
  });

  it('assert that is a create task', () => {
    const createTask = randomCreateTask();

    assert.doesNotThrow(() => {
      assert.ok(assertCreateTask(createTask));
    });

    assert.throws(() => {
      assert.ok(assertCreateTask({ ...createTask, title: '' }));
    });
  });

  it('validate a create task', () => {
    const createTask = randomCreateTask();

    const valid = validateCreateTask(createTask);

    assert.ok(valid.success);
    assert.deepEqual(valid.data, createTask);

    const invalid = validateCreateTask({ ...createTask, title: '' });

    assert.ok(!invalid.success);
    assert.equal(invalid.errors.length, 1);
  });
});

describe('UpdateTask', () => {
  it('create a random update task', () => {
    const updateTask = randomUpdateTask();

    assert.ok(updateTask);
    assert.equal(typeof updateTask.title, 'string');
    assert.equal(typeof updateTask.completed, 'boolean');
  });

  it('assert that is a update task', () => {
    const updateTask = randomUpdateTask();

    assert.doesNotThrow(() => {
      assert.ok(assertUpdateTask(updateTask));
    });

    assert.throws(() => {
      assert.ok(assertUpdateTask({ ...updateTask, completed: '' }));
    });
  });

  it('validate a update task', () => {
    const updateTask = randomUpdateTask();

    const valid = validateUpdateTask(updateTask);

    assert.ok(valid.success);
    assert.deepEqual(valid.data, updateTask);

    const invalid = validateTask({ ...updateTask, completed: '' });

    assert.ok(!invalid.success);
    assert.equal(invalid.errors.length, 5);
  });
});
