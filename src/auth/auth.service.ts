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
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userrepo: Repository<User>,
    private jwt: JwtService,
    private userservice: UserService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      if (createUserInput.confirmpassword != createUserInput.password)
        throw new BadRequestException('password must match confirmpassword');

      const user = this.userrepo.create(createUserInput);
      user.password = await bcrypt.hash(user.password, 12);
      user.createdAt = new Date(Date.now());

      const save = await this.userrepo.save(user);
      const regestertoken = await this.jwt.sign({ save });
      return {
        user: save,
        token: regestertoken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
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
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
