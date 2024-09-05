import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date', nullable: true })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Field(() => Cart)
  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  cart: Cart;

  @Field(() => Order)
  @OneToMany(() => Order, (order) => order.user)
  order: [Order];

  
  @OneToMany(() => Payment, (payment) => payment.user)
  payment: Payment[];
}
