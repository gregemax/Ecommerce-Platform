import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('orderItems')
@ObjectType()
export class orderItems {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  product_quntity: number;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  product_price: number;



  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.orderItems, { eager: false })
  product: Product;
}
