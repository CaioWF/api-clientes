import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';
import { CitiesRepositoryInMemory } from '@modules/cities/repositories/inMemory/CitiesRepositoryInMemory';

import { ListCitiesUseCase } from './ListCitiesUseCase';

describe('ListCitiesUseCase', () => {
  let citiesRepositoryInMemory: ICitiesRepository;
  let listCitiesUseCase: ListCitiesUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    listCitiesUseCase = new ListCitiesUseCase(citiesRepositoryInMemory);
  });

  it('should be able to list cities paginated', async () => {
    const city = await citiesRepositoryInMemory.create({
      name: 'city list',
      state: 'state list',
    });

    const listPaginated = await listCitiesUseCase.execute({ filters: {} });

    expect(listPaginated).toHaveProperty('cities');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.cities).toEqual([city]);
    expect(listPaginated.pagination).toEqual({ skip: 0, take: 10 });
  });

  it('should be able to list cities paginated filtering by name', async () => {
    const city = await citiesRepositoryInMemory.create({
      name: 'city that return',
      state: 'state list',
    });
    await citiesRepositoryInMemory.create({
      name: 'city that not return',
      state: 'state list',
    });

    const listPaginated = await listCitiesUseCase.execute({
      filters: { name: 'that return' },
    });

    expect(listPaginated).toHaveProperty('cities');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.cities).toEqual([city]);
    expect(listPaginated.pagination).toEqual({ skip: 0, take: 10 });
  });

  it('should be able to list cities paginated filtering by state', async () => {
    const city = await citiesRepositoryInMemory.create({
      name: 'city',
      state: 'state that return',
    });
    await citiesRepositoryInMemory.create({
      name: 'city',
      state: 'state that not return',
    });

    const listPaginated = await listCitiesUseCase.execute({
      filters: { state: 'that return' },
    });

    expect(listPaginated).toHaveProperty('cities');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.cities).toEqual([city]);
    expect(listPaginated.pagination).toEqual({ skip: 0, take: 10 });
  });

  it('should be able to list cities paginated skiping some cities', async () => {
    await citiesRepositoryInMemory.create({
      name: 'city that not return',
      state: 'state',
    });
    const city = await citiesRepositoryInMemory.create({
      name: 'city that return',
      state: 'state',
    });

    const listPaginated = await listCitiesUseCase.execute({
      filters: { skip: 1 },
    });

    expect(listPaginated).toHaveProperty('cities');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.cities).toEqual([city]);
    expect(listPaginated.pagination).toEqual({ skip: 1, take: 10 });
  });

  it('should be able to list cities paginated taking some cities', async () => {
    const city = await citiesRepositoryInMemory.create({
      name: 'city that return',
      state: 'state',
    });
    await citiesRepositoryInMemory.create({
      name: 'city that not return',
      state: 'state',
    });

    const listPaginated = await listCitiesUseCase.execute({
      filters: { take: 1 },
    });

    expect(listPaginated).toHaveProperty('cities');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.cities).toEqual([city]);
    expect(listPaginated.pagination).toEqual({ skip: 0, take: 1 });
  });

  it('should be able to list cities paginated using all filters', async () => {
    await citiesRepositoryInMemory.create({
      name: 'city that not return 1',
      state: 'state that not return 1',
    });
    const city = await citiesRepositoryInMemory.create({
      name: 'city that return',
      state: 'state that return',
    });
    await citiesRepositoryInMemory.create({
      name: 'city that not return 2',
      state: 'state that not return 2',
    });

    const listPaginated = await listCitiesUseCase.execute({
      filters: { name: 'city', state: 'state', skip: 1, take: 1 },
    });

    expect(listPaginated).toHaveProperty('cities');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.cities).toEqual([city]);
    expect(listPaginated.pagination).toEqual({ skip: 1, take: 1 });
  });
});
