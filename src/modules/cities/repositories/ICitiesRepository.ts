import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { IListCityDTO } from '../dtos/IListCityDTO';
import { City } from '../infra/typeorm/entities/City';

interface ICitiesRepository {
  create(data: ICreateCityDTO): Promise<City>;
  exists(data: ICreateCityDTO): Promise<boolean>;
  paginate(filters: IListCityDTO): Promise<City[]>;
}

export { ICitiesRepository };
