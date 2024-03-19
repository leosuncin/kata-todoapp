import { z } from 'zod';

export const Login = z.object({
  username: z
    .string()
    .min(5)
    .max(64)
    .regex(/^[\w.~-]*$/u)
    .toLowerCase(),
  password: z.string().min(8).max(32),
});

export type Login = z.infer<typeof Login>;

export const Register = Login.extend({
  acceptTerms: z
    .boolean()
    .refine(
      (value) => value === true,
      'You must accept the terms and conditions',
    ),
});

export type Register = z.infer<typeof Register>;

export const UpdateUser = Login.partial()
  .extend({
    bio: z.string().min(1).optional(),
  })
  .refine((changes) => Object.keys(changes).length > 0, 'No changes provided');

export type UpdateUser = z.infer<typeof UpdateUser>;
