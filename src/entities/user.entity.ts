import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 40 })
  firstName: string;

  @Column({ length: 40 })
  lastName: string;

  @Column({ nullable: true, default: true })
  refreshToken: string | null;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
