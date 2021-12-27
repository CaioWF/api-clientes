import { GenderType } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/inMemory/ClientsRepositoryInMemory';

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
});
