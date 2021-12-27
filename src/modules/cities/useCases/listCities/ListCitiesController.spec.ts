import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;
describe('ListCitiesController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterEach(async () => {
    await connection.query(`DELETE FROM cities`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list cities paginated', async () => {
    await request(app)
      .post('/cities')
      .send({ name: 'city', state: 'state' })
      .expect(201);

    const response = await request(app).get('/cities');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('cities');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.cities[0]).toHaveProperty('id');
    expect(response.body.cities[0].name).toEqual('city');
  });
});
