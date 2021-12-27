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

  it('should be able to create cities with same name and different states', async () => {
    await request(app)
      .post('/cities')
      .send({ name: 'duplicated_name', state: 'any_state' })
      .expect(201);

    await request(app)
      .post('/cities')
      .send({ name: 'duplicated_name', state: 'another_state' })
      .expect(201);
  });

  it('should not be able to create cities with same name and state', async () => {
    await request(app)
      .post('/cities')
      .send({ name: 'duplicated_name', state: 'duplicated_state' })
      .expect(201);

    await request(app)
      .post('/cities')
      .send({ name: 'duplicated_name', state: 'duplicated_state' })
      .expect(409);
  });
});
