import { randomUUID } from 'crypto';

import { GenderType } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/inMemory/ClientsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { RemoveClientUseCase } from './RemoveClientUseCase';

describe('RemoveClientUseCase', () => {
  let clientsRepositoryInMemory: IClientsRepository;
  let removeClientUseCase: RemoveClientUseCase;

  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    removeClientUseCase = new RemoveClientUseCase(clientsRepositoryInMemory);
  });

  it('should be able to delete a client by id', async () => {
    const { id } = await clientsRepositoryInMemory.create({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    await removeClientUseCase.execute(id);

    const clientDeleted = await clientsRepositoryInMemory.findById(id);

    expect(clientDeleted).toBeUndefined();
  });

  it('should be throw an error when user not found', async () => {
    await expect(
      removeClientUseCase.execute(`${randomUUID()}`),
    ).rejects.toEqual(new AppError('Client not found', 404));
  });

  it('should be throw an error when id is invalid', async () => {
    await expect(removeClientUseCase.execute('invalid_id')).rejects.toEqual(
      new AppError('Invalid id', 400),
    );
  });
});
