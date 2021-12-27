import { inject, injectable } from 'tsyringe';

import { IListCitiesDTO } from '../../dtos/IListCitiesDTO';
import { City } from '../../infra/typeorm/entities/City';
import { ICitiesRepository } from '../../repositories/ICitiesRepository';

@injectable()
class ListCitiesUseCase {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  async execute({ name, state, skip, take }: IListCitiesDTO): Promise<{
    cities: City[];
    pagination: { skip: number; take: number };
  }> {
    const filters = { name, state, skip, take };
    if (!skip) filters.skip = 0;
    if (!take) filters.take = 10;

    const cities = await this.citiesRepository.paginate(filters);

    return { cities, pagination: { skip: filters.skip, take: filters.take } };
  }
}

export { ListCitiesUseCase };
