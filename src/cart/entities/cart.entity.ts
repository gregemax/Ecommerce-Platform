import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('cart')
export class Cart {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.cart)
  @Field(() => User)
  user: User;
  
  @Field(()=>Order)
  @OneToMany(() => Order, (or) => or.cart)
  orders: Order[];
  
}

@Entity('cartItem')
@ObjectType()
export class CartItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Cart)
  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn()
  cart: Cart;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.cartItems, { eager: true })
  product: Product;

  @Field()
  @Column({ type: 'int' })
  quantity: number;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
