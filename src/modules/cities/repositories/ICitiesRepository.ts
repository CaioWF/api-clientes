import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { City } from '../infra/typeorm/entities/City';

interface ICitiesRepository {
  create(data: ICreateCityDTO): Promise<City>;
  exists(data: ICreateCityDTO): Promise<boolean>;
}

export { ICitiesRepository };
