import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CartItem } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { orderItems } from 'src/order/entities/orderItem.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('product')
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Field()
  @Column()
  stock: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ nullable: true })
  imageUrl: string;

  @Field(() => CartItem)
  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @Field(() => Int)
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @Field(() => Int)
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @Field(() => orderItems)
  @OneToMany(() => orderItems, (or) => or.product)
  orderItems: orderItems[];
}
