import vine from '@vinejs/vine';
import { Infer } from '@vinejs/vine/types';

const taskSchema = vine.object({
  id: vine.string().startsWith('task_'),
  title: vine.string().minLength(1),
  completed: vine.boolean(),
  authorId: vine.string().startsWith('user_'),
  createdAt: vine.date(),
  updatedAt: vine.date(),
});

export const Task = vine.compile(taskSchema);

export type Task = Infer<typeof taskSchema>;

const createTaskSchema = vine.object({
  title: vine.string().minLength(1),
  authorId: vine.string().startsWith('user_'),
});

export const CreateTask = vine.compile(createTaskSchema);

export type CreateTask = Infer<typeof createTaskSchema>;

const updateTaskSchema = vine.object({
  title: vine.string().minLength(1),
  completed: vine.boolean(),
});

export const UpdateTask = vine.compile(updateTaskSchema);

export type UpdateTask = Infer<typeof updateTaskSchema>;
