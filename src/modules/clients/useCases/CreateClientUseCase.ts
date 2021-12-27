import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { Client, GenderType } from '../infra/typeorm/entities/Client';
import { IClientsRepository } from '../repositories/IClientsRepository';

@injectable()
class CreateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientsRepository,
  ) {}

  async execute({
    full_name,
    gender,
    birth_date,
    city_id,
  }: ICreateClientDTO): Promise<Client> {
    if (!Object.values(GenderType).some((g) => g === gender))
      throw new AppError('Unprocessable entity error', 422);

    const client = await this.clientRepository.create({
      full_name,
      gender,
      birth_date,
      city_id,
    });

    return client;
  }
}

export { CreateClientUseCase };
