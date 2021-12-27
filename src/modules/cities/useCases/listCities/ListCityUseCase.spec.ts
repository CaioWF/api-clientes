import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';
import { CitiesRepositoryInMemory } from '@modules/cities/repositories/inMemory/CitiesRepositoryInMemory';

import { ListCityUseCase } from './ListCityUseCase';

describe('ListCityUseCase', () => {
  let citiesRepositoryInMemory: ICitiesRepository;
  let listCityUseCase: ListCityUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    listCityUseCase = new ListCityUseCase(citiesRepositoryInMemory);
  });

  it('should be able to list cities paginated', async () => {
    const city = await citiesRepositoryInMemory.create({
      name: 'city list',
      state: 'state list',
    });

    const listPaginated = await listCityUseCase.execute({ filters: {} });

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

    const listPaginated = await listCityUseCase.execute({
      filters: { name: 'that return' },
    });

    expect(listPaginated).toHaveProperty('cities');
    expect(listPaginated).toHaveProperty('pagination');
    expect(listPaginated.cities).toEqual([city]);
    expect(listPaginated.pagination).toEqual({ skip: 0, take: 10 });
  });
});
