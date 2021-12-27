import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { IListCitiesDTO } from '../dtos/IListCitiesDTO';
import { City } from '../infra/typeorm/entities/City';

interface ICitiesRepository {
  create(data: ICreateCityDTO): Promise<City>;
  exists(data: ICreateCityDTO): Promise<boolean>;
  paginate(filters: IListCitiesDTO): Promise<City[]>;
}

export { ICitiesRepository };
