import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';

import { MomentDateProvider } from '@shared/container/providers/DateProvider/implementations/MomentDateProvider';

import { Client } from '../entities/Client';

@EventSubscriber()
export class ClientSubscriber implements EntitySubscriberInterface<Client> {
  private momentDateProvider: MomentDateProvider;
  listenTo() {
    return Client;
  }

  async afterLoad(client: Client): Promise<void> {
    this.momentDateProvider = new MomentDateProvider();
    Object.assign(client, {
      age: this.momentDateProvider.getAge(client.birth_date),
    });
  }
}
