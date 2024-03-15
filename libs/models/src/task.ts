import {
  createAssert,
  createIs,
  createRandom,
  createValidateEquals,
  type AssertionGuard,
  type tags,
} from 'typia';

import type { User } from './user.js';

export interface Task {
  readonly id: string & tags.Pattern<'task_\\w+'>;
  readonly title: string & tags.MinLength<1>;
  readonly completed: boolean;
  readonly authorId: User['id'];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const assertTask: AssertionGuard<Task> = createAssert<Task>();

export const isTask = createIs<Task>();

export const randomTask = createRandom<Task>();

export const validateTask = createValidateEquals<Task>();

export type CreateTask = Pick<Task, 'title' | 'authorId'>;

export const assertCreateTask: AssertionGuard<CreateTask> =
  createAssert<CreateTask>();

export const isCreateTask = createIs<CreateTask>();

export const randomCreateTask = createRandom<CreateTask>();

export const validateCreateTask = createValidateEquals<CreateTask>();

export type UpdateTask = Pick<Task, 'completed' | 'title'>;

export const assertUpdateTask: AssertionGuard<UpdateTask> =
  createAssert<UpdateTask>();

export const isUpdateTask = createIs<UpdateTask>();

export const randomUpdateTask = createRandom<UpdateTask>();

export const validateUpdateTask = createValidateEquals<UpdateTask>();
