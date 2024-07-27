import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('float')
  value: number;

  @Column('float')
  cashback: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
