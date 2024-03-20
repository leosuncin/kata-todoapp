import { contract as schema } from '@todoapp/contract';
import { initServer } from '@ts-rest/express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

const { router } = initServer();

export const taskRouter = router(schema.task, {
  async clearCompletedTasks() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async createTask() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async deleteTask() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async deleteTasks() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async getTask() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async getTasks() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async toggleTasks() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async updateTask() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
});
