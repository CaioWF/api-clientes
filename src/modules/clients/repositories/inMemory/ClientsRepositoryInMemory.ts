import { DeleteResult } from 'typeorm';

import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { IListClientsDTO } from '@modules/clients/dtos/IListClientsDTO';
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

  async delete(id: string): Promise<DeleteResult | void> {
    const client = this.clients.find((c) => c.id === id);
    this.clients.splice(this.clients.indexOf(client));
  }

  async paginate(filters: IListClientsDTO): Promise<Client[]> {
    const clients = this.clients.filter(
      (client) =>
        !filters.full_name || client.full_name.includes(filters.full_name),
    );

    return clients.slice(filters.skip, filters.skip + filters.take);
  }
}

export { ClientsRepositoryInMemory };
