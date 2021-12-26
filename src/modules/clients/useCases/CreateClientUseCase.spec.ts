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
      gender: 'M',
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('created_at');
  });
});
