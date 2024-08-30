import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(()=>User)
  user:User

  @Field()
  token:string
}
