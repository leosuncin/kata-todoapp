import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  randomLogin,
  isLogin,
  validateLogin,
  randomRegister,
  isRegister,
  validateRegister,
  randomUpdateUser,
  isUpdateUser,
  validateUpdateUser,
} from './auth.js';

describe('Login', () => {
  it('create a random login', () => {
    const login = randomLogin();

    assert.ok(login);
    assert.equal(typeof login.username, 'string');
    assert.equal(typeof login.password, 'string');
  });

  it('check whether is a login or not', () => {
    const login = randomLogin();

    assert.ok(isLogin(login));
  });

  it('assert that is a login', () => {
    const login = randomLogin();

    assert.doesNotThrow(() => {
      assert.ok(isLogin(login));
    });

    assert.throws(() => {
      assert.ok(isLogin({ ...login, username: 'invalid@username' }));
    });
  });

  it('validate a login', () => {
    const login = randomLogin();

    const valid = validateLogin(login);

    assert.ok(valid.success);
    assert.deepEqual(valid.data, login);

    const invalid = validateLogin({ ...login, username: 'invalid@username' });

    assert.ok(!invalid.success);
    assert.equal(invalid.errors.length, 1);
  });
});

describe('Register', () => {
  it('create a random register', () => {
    const register = randomRegister();

    assert.ok(register);
    assert.equal(typeof register.username, 'string');
    assert.equal(typeof register.password, 'string');
    assert.equal(typeof register.acceptTerms, 'boolean');
  });

  it('check whether is a register or not', () => {
    const register = randomRegister();

    assert.ok(isRegister(register));
  });

  it('assert that is a register', () => {
    const register = randomRegister();

    assert.doesNotThrow(() => {
      assert.ok(isRegister(register));
    });

    assert.throws(() => {
      assert.ok(isRegister({ ...register, username: 'invalid@username' }));
    });
  });

  it('validate a register', () => {
    const register = randomRegister();

    const valid = validateRegister(register);

    assert.ok(valid.success);
    assert.deepEqual(valid.data, register);

    const invalid = validateRegister({
      ...register,
      username: 'invalid@username',
    });

    assert.ok(!invalid.success);
    assert.equal(invalid.errors.length, 1);
  });
});

describe('UpdateUser', () => {
  it('create a random update user', () => {
    const updateUser = randomUpdateUser();

    assert.ok(updateUser);
  });

  it('check whether is an update user or not', () => {
    const updateUser = randomUpdateUser();

    assert.ok(isUpdateUser(updateUser));
  });

  it('assert that is an update user', () => {
    const updateUser = randomUpdateUser();

    assert.doesNotThrow(() => {
      assert.ok(isUpdateUser(updateUser));
    });

    assert.throws(() => {
      assert.ok(isUpdateUser({ ...updateUser, username: 'invalid@username' }));
    });
  });

  it('validate an update user', () => {
    const updateUser = randomUpdateUser();

    const valid = validateUpdateUser(updateUser);

    assert.ok(valid.success);
    assert.deepEqual(valid.data, updateUser);
  });
});
