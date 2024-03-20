import { contract as schema } from '@todoapp/contract';
import { initServer } from '@ts-rest/express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

const { router } = initServer();

export const authRouter = router(schema.auth, {
  async loginUser() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async registerUser() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
  async updateMe() {
    throw createHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  },
});
