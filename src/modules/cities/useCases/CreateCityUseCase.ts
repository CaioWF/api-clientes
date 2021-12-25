import { AppError } from '@shared/errors/AppError';

import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { City } from '../infra/typeorm/entities/City';
import { ICitiesRepository } from '../repositories/ICitiesRepository';

class CreateCityUseCase {
  constructor(private citiesRepository: ICitiesRepository) {}

  async execute({ name, state }: ICreateCityDTO): Promise<City> {
    const cityAlreadyxists = await this.citiesRepository.exists({
      name,
      state,
    });

    if (cityAlreadyxists) throw new AppError('City already exists', 409);

    const city = await this.citiesRepository.create({ name, state });
    return city;
  }
}

export { CreateCityUseCase };
