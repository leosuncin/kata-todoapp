import {
  createAssert,
  createIs,
  createRandom,
  createValidateEquals,
  type AssertionGuard,
  type tags,
} from 'typia';

export interface Login {
  readonly username: string & tags.MinLength<1> & tags.Pattern<'^[\\w.~_-]*$'>;
  readonly password: string & tags.MinLength<8> & tags.MaxLength<32>;
}

export const assertLogin: AssertionGuard<Login> = createAssert<Login>();

export const isLogin = createIs<Login>();

export const randomLogin = createRandom<Login>();

export const validateLogin = createValidateEquals<Login>();

export interface Register extends Login {
  readonly acceptTerms: boolean;
}

export const assertRegister: AssertionGuard<Register> =
  createAssert<Register>();

export const isRegister = createIs<Register>();

export const randomRegister = createRandom<Register>();

export const validateRegister = createValidateEquals<Register>();

export interface UpdateUser extends Partial<Login> {
  readonly bio?: (string & tags.MinLength<1>) | null | undefined;
}

export const assertUpdateUser: AssertionGuard<UpdateUser> =
  createAssert<UpdateUser>();

export const isUpdateUser = createIs<UpdateUser>();

export const randomUpdateUser = createRandom<UpdateUser>();

export const validateUpdateUser = createValidateEquals<UpdateUser>();
