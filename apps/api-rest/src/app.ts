import { errorMiddleware } from '@api-rest/middleware/error-middleware.js';
import { authRouter } from '@api-rest/routes/auth.router.js';
import { taskRouter } from '@api-rest/routes/task.router.js';
import { contract as schema } from '@todoapp/contract';
import { createExpressEndpoints } from '@ts-rest/express';
import express from 'express';

export const app = express();

createExpressEndpoints(
  schema,
  {
    auth: authRouter,
    task: taskRouter,
  },
  app,
);

app.use(errorMiddleware);
