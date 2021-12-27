import { DeleteResult, getRepository, Repository } from 'typeorm';

import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

import { Client } from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  async create(data: ICreateClientDTO): Promise<Client> {
    const client = this.repository.create(data);

    return this.repository.save(client);
  }

  async findById(id: string): Promise<Client> {
    const client = await this.repository.findOne(id);

    return client;
  }

  async delete(id: string): Promise<void | DeleteResult> {
    return this.repository.delete(id);
  }
}

export { ClientsRepository };
