import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  confirmpassword: string;

  @Field({ nullable: true })
  @IsString()
  role?: string;
}
