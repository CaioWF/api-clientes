import express, { Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json({ message: err.message });

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
