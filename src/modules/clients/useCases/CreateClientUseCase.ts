import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { Client } from '../infra/typeorm/entities/Client';
import { IClientsRepository } from '../repositories/IClientsRepository';

class CreateClientUseCase {
  constructor(private clientRepository: IClientsRepository) {}

  async execute({
    full_name,
    sex,
    birth_date,
    city_id,
  }: ICreateClientDTO): Promise<Client> {
    const client = await this.clientRepository.create({
      full_name,
      sex,
      birth_date,
      city_id,
    });

    return client;
  }
}

export { CreateClientUseCase };
