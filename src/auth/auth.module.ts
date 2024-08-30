import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'regestertoken', signOptions: {
      expiresIn:"3d"
    } },),
    TypeOrmModule.forFeature([User]),
    UserModule
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
