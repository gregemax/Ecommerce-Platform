import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cart, CartItem } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Cart,CartItem,Product])],
  providers: [CartResolver, CartService],
})
export class CartModule {}
