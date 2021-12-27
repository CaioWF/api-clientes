import { DeleteResult } from 'typeorm';

import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { IListClientsDTO } from '../dtos/IListClientsDTO';
import { Client } from '../infra/typeorm/entities/Client';

interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findById(id: string): Promise<Client>;
  delete(id: string): Promise<DeleteResult | void>;
  paginate(filters: IListClientsDTO): Promise<Client[]>;
}

export { IClientsRepository };
