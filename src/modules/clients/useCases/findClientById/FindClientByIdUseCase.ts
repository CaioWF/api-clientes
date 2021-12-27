import { inject, injectable } from 'tsyringe';

import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindClientByIdUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(id: string): Promise<Client> {
    const client = await this.clientsRepository.findById(id);

    if (!client) throw new AppError('User not found', 404);

    return client;
  }
}

export { FindClientByIdUseCase };
