import { z } from 'zod';

export const Task = z.object({
  id: z.string().startsWith('task_'),
  title: z.string().trim().min(1),
  authorId: z.string().startsWith('user_'),
  completed: z.boolean().default(true),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Task = z.infer<typeof Task>;

export const CreateTask = Task.pick({ title: true, authorId: true });

export type CreateTask = z.infer<typeof CreateTask>;

export const UpdateTask = Task.pick({ title: true, completed: true })
  .partial()
  .refine((changes) => Object.keys(changes).length > 0, 'No changes provided');

export type UpdateTask = z.infer<typeof UpdateTask>;
