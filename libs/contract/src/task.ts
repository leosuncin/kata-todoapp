import { CreateTask, Task, UpdateTask } from '@todoapp/schemas';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const { router } = initContract();

export const taskRoutes = router(
  {
    createTask: {
      method: 'POST',
      path: '/',
      body: CreateTask,
      responses: {
        201: Task,
      },
      summary: 'Create a new task',
      description: 'Create a new task with a title',
      metadata: {
        authenticated: true,
      } as const,
    },
    getTasks: {
      method: 'GET',
      path: '/',
      responses: {
        200: Task.array(),
      },
      summary: 'Get all tasks',
      description: 'Get all tasks',
      metadata: {
        authenticated: true,
      } as const,
    },
    getTask: {
      method: 'GET',
      path: '/:id',
      pathParams: Task.pick({ id: true }),
      responses: {
        200: Task,
      },
      summary: 'Get a task',
      description: 'Get a task by its id',
      metadata: {
        authenticated: true,
      } as const,
    },
    updateTask: {
      method: 'PATCH',
      path: '/:id',
      pathParams: Task.pick({ id: true }),
      body: UpdateTask,
      responses: {
        200: Task,
      },
      summary: 'Update a task',
      description: 'Update a task with new information',
      metadata: {
        authenticated: true,
      } as const,
    },
    toggleTasks: {
      method: 'PUT',
      path: '/toggle',
      body: Task.pick({ completed: true }),
      responses: {
        200: Task.array(),
      },
      summary: 'Toggle tasks',
      description: 'Toggle all tasks completed status',
      metadata: {
        authenticated: true,
      } as const,
    },
    deleteTask: {
      method: 'DELETE',
      path: '/:id',
      pathParams: Task.pick({ id: true }),
      body: z.never(),
      responses: {
        200: Task,
      },
      summary: 'Delete a task',
      description: 'Delete a task by its id',
      metadata: {
        authenticated: true,
      } as const,
    },
    deleteTasks: {
      method: 'DELETE',
      path: '/',
      body: z.never(),
      responses: {
        200: Task.array(),
      },
      summary: 'Delete all tasks',
      description: 'Delete all of the tasks of the current user',
      metadata: {
        authenticated: true,
      } as const,
    },
    clearCompletedTasks: {
      method: 'DELETE',
      path: '/clear',
      body: z.never(),
      responses: {
        200: Task.array(),
      },
      summary: 'Clear completed tasks',
      description: 'Clear all completed tasks',
      metadata: {
        authenticated: true,
      } as const,
    },
  },
  {
    pathPrefix: '/tasks',
    strictStatusCodes: true,
    validateResponseOnClient: true,
  },
);
