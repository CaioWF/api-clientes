import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { Client } from '../infra/typeorm/entities/Client';

interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;
}

export { IClientsRepository };
