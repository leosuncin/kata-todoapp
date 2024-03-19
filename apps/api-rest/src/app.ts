import { createExpressEndpoints } from '@ts-rest/express';
import express from 'express';

export const app = express();

createExpressEndpoints({}, {}, app);
