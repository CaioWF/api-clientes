import { inject, injectable } from 'tsyringe';

import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import {
  Client,
  GenderType,
} from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

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
