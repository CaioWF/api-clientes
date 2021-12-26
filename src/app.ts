import express from 'express';
import 'reflect-metadata';

import '@shared/container';

import { router } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

createConnection();
const app = express();

app.use(express.json());

app.use(router);

export { app };
