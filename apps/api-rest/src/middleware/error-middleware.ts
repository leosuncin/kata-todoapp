import { type NextFunction, type Request, type Response } from 'express';
import { isHttpError } from 'http-errors';

export function errorMiddleware(
  error: unknown,
  _: Request,
  response: Response,
  next: NextFunction,
): void {
  let status = 500;
  let message: string;

  if (!error) {
    next();
    return;
  }

  if (isHttpError(error)) {
    ({ status, message } = error);
  } else {
    message = error instanceof Error ? error.message : String(error);
  }

  response.status(status).json({ message });
}
