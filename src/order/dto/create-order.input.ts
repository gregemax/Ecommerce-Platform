import { InputType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateshippingInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  country: string;
}

@InputType()
export class CreateOrderInput {
  @Field(()=>Int)
  @IsNumber()
  cartId: number;

  @Field(() => CreateshippingInput)
  @Type(() => CreateshippingInput)
  @ValidateNested()
  shippingplace: CreateshippingInput;
}

@InputType()
export class CreateOrderItemInput {}
