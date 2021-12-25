import { randomUUID } from 'crypto';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('cities')
class City {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}

export { City };
