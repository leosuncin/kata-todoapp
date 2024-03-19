import * as assert from 'node:assert/strict';
import { test } from 'node:test';

import * as fc from 'fast-check';

import { Login, Register, UpdateUser } from '@schemas/auth.js';

const authValidArbitrary = fc.record({
  username: fc
    .string({ minLength: 5, maxLength: 64 })
    .map((username) => username.toLowerCase().replace(/[^\w.~-]/gu, '-')),
  password: fc.string({ minLength: 8, maxLength: 32 }),
  acceptTerms: fc.constant(true),
  bio: fc.string({ minLength: 1 }),
});
const authInvalidArbitrary = fc.record(
  {
    username: fc.string({ maxLength: 4 }),
    password: fc.oneof(
      fc.string({ maxLength: 8 }),
      fc.string({ minLength: 32 }),
    ),
    acceptTerms: fc.constant(false),
    bio: fc.anything().filter((value) => typeof value !== 'string'),
  },
  { withDeletedKeys: true },
);

test('validate login data', () =>
  fc.assert(
    fc.property(authValidArbitrary, (data) => {
      const result = Login.safeParse(data);

      assert.ok(result.success);
    }),
  ));

test('reject invalid login data', () =>
  fc.assert(
    fc.property(authInvalidArbitrary, (data) => {
      const result = Login.safeParse(data);

      assert.ok(result.success === false);
    }),
  ));

test('validate register data', () =>
  fc.assert(
    fc.property(authValidArbitrary, (data) => {
      const result = Register.safeParse(data);

      assert.ok(result.success);
    }),
  ));

test('reject invalid register data', () =>
  fc.assert(
    fc.property(authInvalidArbitrary, (data) => {
      const result = Register.safeParse(data);

      assert.ok(result.success === false);
    }),
  ));

test('validate update user data', () =>
  fc.assert(
    fc.property(authValidArbitrary, (data) => {
      const result = UpdateUser.safeParse(data);

      assert.ok(result.success);
    }),
  ));

test('reject invalid update user data', () =>
  fc.assert(
    fc.property(authInvalidArbitrary, (data) => {
      fc.pre(
        Object.keys(data).length > 0 || typeof data.acceptTerms === 'boolean',
      );

      const result = UpdateUser.safeParse(data);

      assert.ok(result.success === false);
    }),
  ));
