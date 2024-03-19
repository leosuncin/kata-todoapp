import vine from '@vinejs/vine';
import { Infer } from '@vinejs/vine/types';

const userSchema = vine.object({
  id: vine.string().startsWith('user_'),
  username: vine
    .string()
    .minLength(1)
    .regex(/^[\w.~_-]*$/),
  email: vine.string().email(),
  bio: vine.string(),
  createdAt: vine.date(),
  updatedAt: vine.date(),
});

export const User = vine.compile(userSchema);

export type User = Infer<typeof userSchema>;
