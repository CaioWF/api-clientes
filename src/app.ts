import express from 'express';
import 'reflect-metadata';

import createConnection from '@shared/infra/typeorm';

createConnection();
const app = express();

app.use(express.json());

export { app };
