import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/enums';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { shippingPlace } from './shipping.entity';
import { orderItems } from './orderItem.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@ObjectType()
@Entity('order')
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  orderAt: Date;

  @Field()
  @Column({
    type: 'enum',
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Field()
  @Column({ nullable: true })
  shippedAt: Date;

  @Field()
  @Column({ nullable: true })
  deliveredAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (User) => User.order)
  user: User;

  @Field()
  @OneToOne(() => shippingPlace)
  @JoinColumn()
  shippingPlace: shippingPlace;

  @Field()
  @Column({ nullable: true })
  createdAt: Date;

  @Field()
  @Column({ nullable: true })
  updatedAt: Date;

  @Field(() => Cart)
  @ManyToOne(() => Cart, (cart) => cart.orders)
  cart: Cart;
}
