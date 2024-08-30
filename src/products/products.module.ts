import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import {MulterModule} from "@nestjs/platform-express"
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cart, CartItem } from 'src/cart/entities/cart.entity';
import { Product } from './entities/product.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [MulterModule,CloudinaryModule  ,TypeOrmModule.forFeature([User,Cart,CartItem,Product]),JwtModule],
  providers: [ProductsResolver, ProductsService],
  exports :[ProductsService]
})
export class ProductsModule {}
