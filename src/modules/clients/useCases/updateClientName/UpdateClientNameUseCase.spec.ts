import { randomUUID } from 'crypto';

import { GenderType } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/inMemory/ClientsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { UpdateClientNameUseCase } from './UpdateClientNameUseCase';

describe('UpdateClientNameUseCase', () => {
  let clientsRepositoryInMemory: IClientsRepository;
  let updateClientNameUseCase: UpdateClientNameUseCase;

  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    updateClientNameUseCase = new UpdateClientNameUseCase(
      clientsRepositoryInMemory,
    );
  });

  it('should be able to update a client name', async () => {
    const { id } = await clientsRepositoryInMemory.create({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    const client = await updateClientNameUseCase.execute({
      id,
      full_name: 'another_name',
    });

    expect(client.id).toEqual(id);
    expect(client.full_name).toEqual('another_name');
  });

  it('should be throw an error when client not found', async () => {
    await expect(
      updateClientNameUseCase.execute({
        id: `${randomUUID()}`,
        full_name: 'any_name',
      }),
    ).rejects.toEqual(new AppError('Client not found', 404));
  });

  it('should be throw an error when id is invalid', async () => {
    await expect(
      updateClientNameUseCase.execute({
        id: 'invalid_id',
        full_name: 'any_name',
      }),
    ).rejects.toEqual(new AppError('Invalid id', 400));
  });
});
