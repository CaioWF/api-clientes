import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';
import { CitiesRepositoryInMemory } from '@modules/cities/repositories/inMemory/CitiesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCityUseCase } from './CreateCityUseCase';

describe('CreateCityUseCase', () => {
  let citiesRepositoryInMemory: ICitiesRepository;
  let createCityUseCase: CreateCityUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(citiesRepositoryInMemory);
  });

  it('should be able to create a new city', async () => {
    const city = await createCityUseCase.execute({
      name: 'any_name',
      state: 'any_state',
    });

    expect(city).toHaveProperty('id');
    expect(city).toHaveProperty('created_at');
  });

  it('should be able to create cities with same name and different states', async () => {
    await createCityUseCase.execute({
      name: 'duplicated_name',
      state: 'any_state',
    });

    const city = await createCityUseCase.execute({
      name: 'duplicated_name',
      state: 'another_state',
    });

    expect(city).toHaveProperty('id');
    expect(city).toHaveProperty('created_at');
  });

  it('should throw when try create a new city with conflicts (same name and state)', async () => {
    const city = { name: 'duplicated_name', state: 'duplicated_state' };

    await citiesRepositoryInMemory.create(city);

    await expect(createCityUseCase.execute(city)).rejects.toEqual(
      new AppError('City already exists', 409),
    );
  });
});
