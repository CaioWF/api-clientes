import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { IListCitiesDTO } from '@modules/cities/dtos/IListCitiesDTO';
import { City } from '@modules/cities/infra/typeorm/entities/City';

import { ICitiesRepository } from '../ICitiesRepository';

class CitiesRepositoryInMemory implements ICitiesRepository {
  cities: City[] = [];

  async create(data: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, { ...data, created_at: new Date() });

    this.cities.push(city);

    return city;
  }

  async paginate({ filters }: IListCitiesDTO): Promise<City[]> {
    const cities = this.cities.filter(
      (city) =>
        (!filters.name || city.name.includes(filters.name)) &&
        (!filters.state || city.state.includes(filters.state)),
    );

    return cities.slice(filters.skip, filters.skip + filters.take);
  }

  async exists(data: ICreateCityDTO): Promise<boolean> {
    const city = this.cities.find(
      (city) => city.name === data.name && city.state === data.state,
    );

    return !!city;
  }
}

export { CitiesRepositoryInMemory };
