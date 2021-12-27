import { GenderType } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/inMemory/ClientsRepositoryInMemory';

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
});
