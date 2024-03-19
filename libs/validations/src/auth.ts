import vine from '@vinejs/vine';
import { Infer } from '@vinejs/vine/types';

const loginSchema = vine.object({
  username: vine
    .string()
    .minLength(1)
    .regex(/^[\w.~_-]*$/),
  password: vine.string().minLength(8).maxLength(32),
});

export const Login = vine.compile(loginSchema);

export type Login = Infer<typeof loginSchema>;

const registerSchema = vine.object({
  username: vine
    .string()
    .minLength(1)
    .regex(/^[\w.~_-]*$/),
  email: vine.string().email(),
  acceptTerms: vine.boolean(),
});

export const Register = vine.compile(registerSchema);

export type Register = Infer<typeof registerSchema>;

const updateUserSchema = vine.object({
  username: vine
    .string()
    .minLength(1)
    .regex(/^[\w.~_-]*$/),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
  bio: vine.string(),
});

export const UpdateUser = vine.compile(updateUserSchema);

export type UpdateUser = Infer<typeof updateUserSchema>;
