import { errorMiddleware } from '@api-rest/middleware/error-middleware.js';
import { createExpressEndpoints } from '@ts-rest/express';
import express from 'express';

export const app = express();

createExpressEndpoints({}, {}, app);

app.use(errorMiddleware);
