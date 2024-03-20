import * as assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import { createDatabase, type Connection } from '@data-access/database.js';
import { UserRepository } from '@data-access/user.repository.js';
import { createMigrator } from '@migrations/index.js';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let connection: Connection;

  beforeEach(async () => {
    connection = createDatabase(':memory:');
    userRepository = new UserRepository(connection);
    const migrator = createMigrator(connection);

    await migrator.migrateToLatest();
  });

  afterEach(async () => {
    await connection.destroy();
  });

  it('create a user', async () => {
    const user = await userRepository.createUser({
      username: 'testuser',
      password: 'testpassword',
    });

    assert.ok(user);
    assert.equal(user.username, 'testuser');
    assert.match(user.id, /user_\w+/);
  });

  it('get users', async () => {
    const users = await userRepository.getUsers();

    assert.ok(Array.isArray(users));
  });

  it('get a user by username', async () => {
    await userRepository.createUser({
      username: 'testuser',
      password: 'testpassword',
    });
    const user = await userRepository.getUserByUsername('testuser');

    assert.ok(user);
    assert.equal(user.username, 'testuser');
  });

  it('update a user by username', async () => {
    await userRepository.createUser({
      username: 'testuser',
      password: 'testpassword',
    });
    const user = await userRepository.updateUserByUsername('testuser', {
      bio: 'Ullamco et magna exercitation voluptate et irure.',
    });

    assert.ok(user);
    assert.equal(user.bio, 'Ullamco et magna exercitation voluptate et irure.');
  });

  it('delete a user by username', async () => {
    await userRepository.createUser({
      username: 'testuser',
      password: 'testpassword',
    });
    const user = await userRepository.deleteUserByUsername('testuser');

    assert.ok(user);
    assert.equal(user.username, 'testuser');
  });
});
