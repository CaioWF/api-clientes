import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { City } from '../infra/typeorm/entities/City';
import { ICitiesRepository } from '../repositories/ICitiesRepository';

class CreateCityUseCase {
  constructor(private citiesRepository: ICitiesRepository) {}

  async execute({ name, state }: ICreateCityDTO): Promise<City> {
    const city = await this.citiesRepository.create({ name, state });
    return city;
  }
}

export { CreateCityUseCase };
