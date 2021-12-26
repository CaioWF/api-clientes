import { AppError } from '@shared/errors/AppError';

import { GenderType } from '../infra/typeorm/entities/Client';
import { IClientsRepository } from '../repositories/IClientsRepository';
import { ClientsRepositoryInMemory } from '../repositories/inMemory/ClientsRepositoryInMemory';
import { CreateClientUseCase } from './CreateClientUseCase';

describe('CreateClientUseCase', () => {
  let clientsRepositoryInMemory: IClientsRepository;
  let createClientUseCase: CreateClientUseCase;

  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(clientsRepositoryInMemory);
  });

  it('should be able to create a new client', async () => {
    const client = await createClientUseCase.execute({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('created_at');
  });

  it('should not be able to create a new client with unmapped gender', async () => {
    await expect(
      createClientUseCase.execute({
        full_name: 'any_name',
        gender: 'unmapped_gender',
        birth_date: new Date(),
        city_id: 'any_city_id',
      }),
    ).rejects.toEqual(new AppError('Unprocessable entity error', 422));
  });
});
