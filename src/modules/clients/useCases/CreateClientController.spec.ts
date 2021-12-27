import request from 'supertest';
import { Connection } from 'typeorm';

import { City } from '@modules/cities/infra/typeorm/entities/City';
import { GenderType } from '@modules/clients/infra/typeorm/entities/Client';
import createConnection from '@shared/infra/typeorm';

import { app } from '../../../app';

let connection: Connection;
let sharedCity: City;
describe('CreateClientController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const response = await request(app)
      .post('/cities')
      .send({ name: 'Shared city', state: 'Shared state' });
    sharedCity = response.body;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new client', async () => {
    await request(app)
      .post('/clients')
      .send({
        full_name: 'any_name',
        gender: GenderType.MALE,
        birth_date: '2000-01-01',
        city_id: sharedCity.id,
      })
      .expect(201);
  });
});
