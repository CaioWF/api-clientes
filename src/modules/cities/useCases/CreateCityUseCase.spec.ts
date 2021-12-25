import { ICitiesRepository } from '../repositories/ICitiesRepository';
import { CitiesRepositoryInMemory } from '../repositories/inMemory/CitiesRepositoryInMemory';
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
});
