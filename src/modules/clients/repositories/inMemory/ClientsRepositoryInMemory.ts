import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';

import { IClientsRepository } from '../IClientsRepository';

class ClientsRepositoryInMemory implements IClientsRepository {
  clients: Client[] = [];

  async create(data: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, { ...data, created_at: new Date() });

    this.clients.push(client);

    return client;
  }

  async findById(id: string): Promise<Client> {
    return this.clients.find((client) => client.id === id);
  }
}

export { ClientsRepositoryInMemory };
