import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('shippingPlace')
@ObjectType()
export class shippingPlace {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  postalCode: string;

  @Field()
  @Column()
  country: string;

  @Field(() => Order)
  @OneToOne(() => Order, (order) => order.shippingPlace, { cascade: true })
  orders: Order;
}
