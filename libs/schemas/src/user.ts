import { z } from 'zod';

export const User = z.object({
  id: z.string().startsWith('user_'),
  username: z
    .string()
    .regex(/^[\w.~-]*$/u)
    .toLowerCase(),
  password: z.string(),
  bio: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof User>;

export const UserWithoutPassword = User.omit({ password: true });

export type UserWithoutPassword = z.infer<typeof UserWithoutPassword>;
