import {
  createAssert,
  createIs,
  createRandom,
  createValidateEquals,
  type AssertionGuard,
  type tags,
} from 'typia';

export interface User {
  readonly id: string & tags.Pattern<'user_\\w+'>;
  readonly username: string & tags.MinLength<1>;
  readonly password: string;
  readonly bio?: string | null | undefined;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const assertUser: AssertionGuard<User> = createAssert<User>();

export const isUser = createIs<User>();

export const randomUser = createRandom<User>();

export const validateUser = createValidateEquals<User>();

export type UserWithoutPassword = Omit<User, 'password'>;

export const assertUserWithoutPassword: AssertionGuard<UserWithoutPassword> =
  createAssert<UserWithoutPassword>();

export const isUserWithoutPassword = createIs<UserWithoutPassword>();

export const randomUserWithoutPassword = createRandom<UserWithoutPassword>();

export const validateUserWithoutPassword =
  createValidateEquals<UserWithoutPassword>();
