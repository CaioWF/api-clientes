import { randomUUID } from 'crypto';

import { GenderType } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/inMemory/ClientsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { FindClientByIdUseCase } from './FindClientByIdUseCase';

describe('FindClientByIdUseCase', () => {
  let clientsRepositoryInMemory: IClientsRepository;
  let findClientByIdUseCase: FindClientByIdUseCase;

  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    findClientByIdUseCase = new FindClientByIdUseCase(
      clientsRepositoryInMemory,
    );
  });

  it('should be able to return a client by id', async () => {
    const { id } = await clientsRepositoryInMemory.create({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    const client = await findClientByIdUseCase.execute(id);

    expect(client.id).toEqual(id);
  });

  it('should be throw an error when user not be found', async () => {
    await expect(
      findClientByIdUseCase.execute(`${randomUUID()}`),
    ).rejects.toEqual(new AppError('Client not found', 404));
  });

  it('should be throw an error when id is invalid', async () => {
    await expect(findClientByIdUseCase.execute('invalid_id')).rejects.toEqual(
      new AppError('Invalid id', 400),
    );
  });
});
