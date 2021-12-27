import { inject, injectable } from 'tsyringe';
import validator from 'validator';

import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class RemoveClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!validator.isUUID(id)) throw new AppError('Invalid id');

    const client = await this.clientsRepository.findById(id);

    if (!client) throw new AppError('Client not found', 404);

    await this.clientsRepository.delete(id);
  }
}

export { RemoveClientUseCase };
