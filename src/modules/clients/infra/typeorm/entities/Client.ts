import { randomUUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { City } from '@modules/cities/infra/typeorm/entities/City';

@Entity('clients')
class Client {
  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column()
  sex: string;

  @Column()
  birth_date: Date;

  age: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}

export { Client };
