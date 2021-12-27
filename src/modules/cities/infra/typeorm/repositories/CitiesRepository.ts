import { getRepository, Repository } from 'typeorm';

import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { IListCitiesDTO } from '@modules/cities/dtos/IListCitiesDTO';
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

  async paginate(filters: IListCitiesDTO): Promise<City[]> {
    const citiesQuery = await this.repository.createQueryBuilder('c');

    if (filters.name)
      citiesQuery.andWhere('c.name like :name', { name: `%${filters.name}%` });

    if (filters.state)
      citiesQuery.andWhere('c.state like :state', {
        state: `%${filters.state}%`,
      });

    return citiesQuery.getMany();
  }

  async exists(data: ICreateCityDTO): Promise<boolean> {
    const city = await this.repository.findOne(data);

    return !!city;
  }
}

export { CitiesRepository };
