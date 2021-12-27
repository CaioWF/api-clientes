import { DeleteResult } from 'typeorm';

import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { Client } from '../infra/typeorm/entities/Client';

interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findById(id: string): Promise<Client>;
  delete(id: string): Promise<DeleteResult | void>;
}

export { IClientsRepository };
