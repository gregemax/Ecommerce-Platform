import { InputType, Int, Field } from '@nestjs/graphql';

import { IsString, IsNumber, IsNotEmpty, IsDecimal } from 'class-validator';

@InputType()
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @Field(() => Int)
  @IsNumber()
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
}
