import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';



@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userrepo: Repository<User>) {}
 

 async findAll() {

try {
  return await this.userrepo.find();
  
} catch (error) {
  throw new BadRequestException(error.message)
}
  }

  async findOne(id: number) {
    try {
      const user = await this.userrepo.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException(`User with ID ${id} not found`);
      }
     return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  async findbyemail(email:string) {
    try {
      const user = await this.userrepo.findOne({ where: { email},relations:{order:true,cart:true} });
      if (!user) {
        throw new BadRequestException(`User with ID ${email} not found`);
      }
     return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

 async update(id: number, updateUserInput: UpdateUserInput) {
try {
  const user = await this.userrepo.update(id,updateUserInput);
  if (!user.affected) {
    throw new BadRequestException(`User with ID ${id} not found`);
  }
  return "updated successfull";
} catch (error) {
  throw new BadRequestException(error.message)
}
  }

 async remove(id: number) {
    try {
      const user = await this.userrepo.delete(id)
      if (!user) {
        throw new BadRequestException(`user not found with this id ${id}`)
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
