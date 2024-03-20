import * as assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import { createDatabase, type Connection } from '@data-access/database.js';
import { UserRepository } from '@data-access/user.repository.js';
import * as createUsersTableMigration from '@migrations/0001-create-users-table.js';
import * as createTasksTableMigration from '@migrations/0002-create-tasks-table.js';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let connection: Connection;

  beforeEach(async () => {
    connection = createDatabase(':memory:');

    await createUsersTableMigration.up(connection);
    await createTasksTableMigration.up(connection);

    userRepository = new UserRepository(connection);
  });

  afterEach(async () => {
    await createTasksTableMigration.down(connection);
    await createUsersTableMigration.down(connection);
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
