import * as assert from 'node:assert/strict';
import { test } from 'node:test';

import * as fc from 'fast-check';

import { User, UserWithoutPassword } from '@schemas/user.js';

const userArbitrary: fc.Arbitrary<User> = fc.record({
  id: fc.string({ minLength: 1 }).map((id) => `user_${id}`),
  username: fc
    .string({ minLength: 1 })
    .map((username) => username.toLowerCase().replace(/[^\w.~-]/gu, '')),
  password: fc.string({ minLength: 8, maxLength: 32 }),
  bio: fc.string({ minLength: 1 }),
  createdAt: fc.date(),
  updatedAt: fc.date(),
});

test('validate user data', () =>
  fc.assert(
    fc.property(userArbitrary, (data) => {
      const result = User.safeParse(data);

      assert.ok(result.success);
    }),
  ));

test('reject invalid user data', () =>
  fc.assert(
    fc.property(
      fc.record(
        {
          id: fc.string(),
          username: fc
            .string()
            .map((username) =>
              username?.toLowerCase().replace(/[\w.~-]/gu, ''),
            ),
          password: fc.string({ minLength: 8, maxLength: 32 }),
          bio: fc.string(),
          createdAt: fc.date(),
          updatedAt: fc.date(),
        },
        { withDeletedKeys: true },
      ),
      (data) => {
        const result = User.safeParse(data);

        assert.ok(result.success === false);
      },
    ),
  ));

test('validate user that password is removed', () =>
  fc.assert(
    fc.property(userArbitrary, (data) => {
      const result = UserWithoutPassword.safeParse(data);

      assert.ok(result.success);
      assert.ok(!('password' in result.data));
    }),
  ));
