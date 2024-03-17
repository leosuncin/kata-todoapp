import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  assertUser,
  assertUserWithoutPassword,
  isUser,
  isUserWithoutPassword,
  randomUser,
  randomUserWithoutPassword,
  validateUser,
  validateUserWithoutPassword,
} from './user.js';

describe('User', () => {
  it('create a random user', () => {
    const user = randomUser();

    assert.ok(user);
    assert.equal(typeof user.id, 'string');
    assert.equal(typeof user.username, 'string');
    assert.equal(typeof user.password, 'string');
    assert.ok(user.createdAt instanceof Date);
    assert.ok(user.updatedAt instanceof Date);
  });

  it('check whether is a user or not', () => {
    const user = randomUser();

    assert.ok(isUser(user));
  });

  it('assert that is a user', () => {
    const user = randomUser();

    assert.doesNotThrow(() => {
      assert.ok(assertUser(user));
    });

    assert.throws(() => {
      assert.ok(assertUser({ ...user, id: 'invalid_id' }));
    });
  });

  it('validate a user', () => {
    const user = randomUser();

    const valid = validateUser(user);

    assert.ok(valid.success);
    assert.deepEqual(valid.data, user);

    const invalid = validateUser({ ...user, id: 'invalid_id' });

    assert.ok(!invalid.success);
    assert.equal(invalid.errors.length, 1);
  });
});

describe('UserWithoutPassword', () => {
  it('create a random user without password', () => {
    const userWithoutPassword = randomUserWithoutPassword();

    assert.ok(userWithoutPassword);
    assert.equal(typeof userWithoutPassword.id, 'string');
    assert.equal(typeof userWithoutPassword.username, 'string');
    assert.ok(userWithoutPassword.createdAt instanceof Date);
    assert.ok(userWithoutPassword.updatedAt instanceof Date);
  });

  it('check whether is a user without password or not', () => {
    const userWithoutPassword = randomUserWithoutPassword();

    assert.ok(isUserWithoutPassword(userWithoutPassword));
  });

  it('assert that is a user without password', () => {
    const userWithoutPassword = randomUserWithoutPassword();

    assert.doesNotThrow(() => {
      assert.ok(assertUserWithoutPassword(userWithoutPassword));
    });

    assert.throws(() => {
      assert.ok(
        assertUserWithoutPassword({ ...userWithoutPassword, id: 'invalid_id' }),
      );
    });
  });

  it('validate a user without password', () => {
    const userWithoutPassword = randomUserWithoutPassword();

    const valid = validateUserWithoutPassword(userWithoutPassword);

    assert.ok(valid.success);
    assert.deepEqual(valid.data, userWithoutPassword);

    const invalid = validateUserWithoutPassword({
      ...userWithoutPassword,
      id: 'invalid_id',
    });

    assert.ok(!invalid.success);
    assert.equal(invalid.errors.length, 1);
  });
});
