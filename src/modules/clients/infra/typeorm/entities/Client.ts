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

enum GenderType {
  MALE = 'M',
  FEMALE = 'F',
}

@Entity('clients')
class Client {
  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column({ type: 'enum', enum: GenderType })
  gender: string;

  @Column()
  birth_date: Date;

  age: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  city_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}

export { Client, GenderType };
