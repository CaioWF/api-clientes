import { getRepository, Repository } from 'typeorm';

import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';

import { City } from '../entities/City';

class CitiesRepository implements ICitiesRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = getRepository(City);
  }

  async create(data: ICreateCityDTO): Promise<City> {
    const city = this.repository.create(data);

    return this.repository.save(city);
  }

  async exists(data: ICreateCityDTO): Promise<boolean> {
    const city = await this.repository.findOne(data);

    return !!city;
  }
}

export { CitiesRepository };
