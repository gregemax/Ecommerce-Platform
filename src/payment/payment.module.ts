import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Payment,User,Order])],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
