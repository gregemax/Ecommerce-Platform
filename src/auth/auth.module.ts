import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './gurad/gurdStratage';
import { CartModule } from 'src/cart/cart.module';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'regestertoken', signOptions: {
      expiresIn:"3d"
    } },),
    TypeOrmModule.forFeature([User,Cart ]),
    UserModule,
    
  ],
  providers: [AuthResolver, AuthService,JwtStrategy],
})
export class AuthModule {}
