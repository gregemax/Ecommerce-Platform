import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { orderItems } from './entities/orderItem.entity';
import { Order } from './entities/order.entity';
import { shippingPlace } from './entities/shipping.entity';
import { User } from 'src/user/entities/user.entity';
import { Cart, CartItem } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, orderItems, Order, shippingPlace,User,Cart])],
    providers: [OrderResolver, OrderService],
})
export class OrderModule {}
