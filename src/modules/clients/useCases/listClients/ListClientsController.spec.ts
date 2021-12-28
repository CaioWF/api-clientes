import request from 'supertest';
import { Connection } from 'typeorm';

import { City } from '@modules/cities/infra/typeorm/entities/City';
import { GenderType } from '@modules/clients/infra/typeorm/entities/Client';
import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;
let sharedCity: City;
describe('ListClientsController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const response = await request(app)
      .post('/cities')
      .send({ name: 'Shared city', state: 'Shared state' });
    sharedCity = response.body;
  });

  afterEach(async () => {
    await connection.query(`DELETE FROM clients`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list clients paginated', async () => {
    await request(app)
      .post('/clients')
      .send({
        full_name: 'any_name',
        gender: GenderType.MALE,
        birth_date: '2000-01-01',
        city_id: sharedCity.id,
      })
      .expect(201);

    const response = await request(app).get('/clients');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clients');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.clients[0]).toHaveProperty('id');
    expect(response.body.clients[0].full_name).toEqual('any_name');
  });

  it('should be able to list clients paginated filtering by full name', async () => {
    await request(app)
      .post('/clients')
      .send({
        full_name: 'any_name',
        gender: GenderType.MALE,
        birth_date: '2000-01-01',
        city_id: sharedCity.id,
      })
      .expect(201);

    await request(app)
      .post('/clients')
      .send({
        full_name: 'another_name',
        gender: GenderType.MALE,
        birth_date: '2000-01-01',
        city_id: sharedCity.id,
      })
      .expect(201);

    const response = await request(app)
      .get('/clients')
      .query({ full_name: 'any' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clients');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.clients[0]).toHaveProperty('id');
    expect(response.body.clients[0].full_name).toEqual('any_name');
  });

  it('should be able to list clients paginated skiping some clients', async () => {
    await request(app)
      .post('/clients')
      .send({
        full_name: 'any_name',
        gender: GenderType.MALE,
        birth_date: '2000-01-01',
        city_id: sharedCity.id,
      })
      .expect(201);

    await request(app)
      .post('/clients')
      .send({
        full_name: 'another_name',
        gender: GenderType.MALE,
        birth_date: '2000-01-01',
        city_id: sharedCity.id,
      })
      .expect(201);

    const response = await request(app).get('/clients').query({ skip: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clients');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.clients.length).toEqual(1);
  });
});
