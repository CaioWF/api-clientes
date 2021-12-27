import { inject, injectable } from 'tsyringe';
import validator from 'validator';

import { IUpdateClientNameDTO } from '@modules/clients/dtos/IUpdateClientNameDTO';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateClientNameUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({ id, full_name }: IUpdateClientNameDTO): Promise<Client> {
    if (!validator.isUUID(id)) throw new AppError('Invalid id');

    const client = await this.clientsRepository.findById(id);

    if (!client) throw new AppError('Client not found', 404);

    client.full_name = full_name;

    const clientUpdated = await this.clientsRepository.create(client);

    return clientUpdated;
  }
}

export { UpdateClientNameUseCase };
