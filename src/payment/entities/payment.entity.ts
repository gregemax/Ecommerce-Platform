import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => Int)
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  method: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  @Field()
  status: PaymentStatus;

  @Column({ type: 'text', nullable: true })
  @Field()
  transactionId?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToOne(() => User, (User) => User.payment, { eager: true })
  @Field(() => User)
  user: User;
  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  @Field(()=>Order)
  order: Order;
}
