import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import {} from 'multer';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/.graphql',
      context: ({ req }) => ({ req }),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

      introspection: true,

    }),
    AuthModule,
    UserModule,
    CartModule,
    ProductsModule,
    CloudinaryModule,
    InventoryModule,
    OrderModule,
  ],
})
export class AppModule {}
