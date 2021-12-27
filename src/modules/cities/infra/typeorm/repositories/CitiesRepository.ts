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

  async paginate({ name, state, skip, take }: IListCitiesDTO): Promise<City[]> {
    const citiesQuery = await this.repository
      .createQueryBuilder('c')
      .skip(skip)
      .take(take);

    if (name)
      citiesQuery.andWhere('LOWER(c.name) like LOWER(:name)', {
        name: `%${name}%`,
      });

    if (state)
      citiesQuery.andWhere('LOWER(c.state) like LOWER(:state)', {
        state: `%${state}%`,
      });

    return citiesQuery.getMany();
  }

  async exists(data: ICreateCityDTO): Promise<boolean> {
    const city = await this.repository.findOne(data);

    return !!city;
  }
}

export { CitiesRepository };
