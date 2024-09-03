import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { Cart } from 'src/cart/entities/cart.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userrepo: Repository<User>,
    @InjectRepository(Cart) private Cartrepo: Repository<Cart>,
    private jwt: JwtService,
    private userservice: UserService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      
      if (createUserInput.confirmpassword !== createUserInput.password) {
        throw new BadRequestException('Password must match confirmPassword');
      }

      
      const user = this.userrepo.create(createUserInput);
      user.password = await bcrypt.hash(user.password, 12); 
      user.createdAt = new Date(Date.now());

    
      const cart = this.Cartrepo.create(); 
      cart.user = user; 

      
      const savedCart = await this.Cartrepo.save(cart);
      user.cart = savedCart; 

      
      const savedUser = await this.userrepo.save(user);


      const registerToken = await this.jwt.sign({ id: savedUser.id });

 
      return {
        user: {
          ...savedUser,
          
        },
        token: registerToken,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred during registration',
      );
    }

  }

  async login(email: string, password: string) {
    try {
      const user = await this.userservice.findbyemail(email);
      const verifypassword = await bcrypt.hash(password, user.password);
      if (!verifypassword) {
        throw new BadRequestException('Invalid credentials');
      }
      const regestertoken = await this.jwt.sign({ id: user.id });
      return {
        user,
        token: regestertoken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
 
}
