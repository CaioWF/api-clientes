import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../app';

let connection: Connection;
describe('CreateCityController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new city', async () => {
    await request(app)
      .post('/cities')
      .send({ name: 'any_city', state: 'any_state' })
      .expect(201);
  });
});
