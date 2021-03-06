import { GenderType } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/inMemory/ClientsRepositoryInMemory';

import { ListClientsUseCase } from './ListClientsUseCase';

describe('UpdateClientNameUseCase', () => {
  let clientsRepositoryInMemory: IClientsRepository;
  let listClientsUseCase: ListClientsUseCase;

  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    listClientsUseCase = new ListClientsUseCase(clientsRepositoryInMemory);
  });

  it('should be able to list clients paginated', async () => {
    const client = await clientsRepositoryInMemory.create({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    const listPaginated = await listClientsUseCase.execute({});

    expect(listPaginated).toHaveProperty('clients');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.clients).toEqual([client]);
    expect(listPaginated.pagination).toEqual({ skip: 0, take: 10 });
  });

  it('should be able to list clients paginated filtering by full name', async () => {
    const client = await clientsRepositoryInMemory.create({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });
    await clientsRepositoryInMemory.create({
      full_name: 'another_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    const listPaginated = await listClientsUseCase.execute({
      full_name: 'any',
    });

    expect(listPaginated).toHaveProperty('clients');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.clients).toEqual([client]);
    expect(listPaginated.pagination).toEqual({ skip: 0, take: 10 });
  });

  it('should be able to list clients paginated skiping some clients', async () => {
    await clientsRepositoryInMemory.create({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });
    const client = await clientsRepositoryInMemory.create({
      full_name: 'another_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    const listPaginated = await listClientsUseCase.execute({ skip: 1 });

    expect(listPaginated).toHaveProperty('clients');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.clients).toEqual([client]);
    expect(listPaginated.pagination).toEqual({ skip: 1, take: 10 });
  });

  it('should be able to list clients paginated taking some clients', async () => {
    const client = await clientsRepositoryInMemory.create({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });
    await clientsRepositoryInMemory.create({
      full_name: 'another_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    const listPaginated = await listClientsUseCase.execute({ take: 1 });

    expect(listPaginated).toHaveProperty('clients');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.clients).toEqual([client]);
    expect(listPaginated.pagination).toEqual({ skip: 0, take: 1 });
  });

  it('should be able to list clients paginated using all filters', async () => {
    await clientsRepositoryInMemory.create({
      full_name: 'any_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });
    const client = await clientsRepositoryInMemory.create({
      full_name: 'another_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });
    await clientsRepositoryInMemory.create({
      full_name: 'one_more_name',
      gender: GenderType.MALE,
      birth_date: new Date(),
      city_id: 'any_city_id',
    });

    const listPaginated = await listClientsUseCase.execute({
      full_name: 'name',
      skip: 1,
      take: 1,
    });

    expect(listPaginated).toHaveProperty('clients');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.clients).toEqual([client]);
    expect(listPaginated.pagination).toEqual({ skip: 1, take: 1 });
  });
});
