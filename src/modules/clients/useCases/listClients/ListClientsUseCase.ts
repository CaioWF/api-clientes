import { inject, injectable } from 'tsyringe';

import { IListClientsDTO } from '@modules/clients/dtos/IListClientsDTO';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

@injectable()
class ListClientsUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({ full_name, skip, take }: IListClientsDTO): Promise<{
    clients: Client[];
    pagination: { skip: number; take: number };
  }> {
    const filters = { full_name, skip, take };
    if (!skip) filters.skip = 0;
    if (!take) filters.take = 10;

    const clients = await this.clientsRepository.paginate(filters);

    return { clients, pagination: { skip: filters.skip, take: filters.take } };
  }
}

export { ListClientsUseCase };
