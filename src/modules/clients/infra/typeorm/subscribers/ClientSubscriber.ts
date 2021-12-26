import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';

import { Client } from '../entities/Client';

@EventSubscriber()
export class ClientSubscriber implements EntitySubscriberInterface<Client> {
  listenTo() {
    return Client;
  }

  async afterLoad(client: Client): Promise<void> {
    Object.assign(client, { age: 1 });
  }
}
