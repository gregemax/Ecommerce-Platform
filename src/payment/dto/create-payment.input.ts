import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreditCardDetails {
  @IsString()
  @Field()
  number: string;

  @IsString()
  @Field()
  expiry: string;

  @IsString()
  @Field()
  cvv: string;

  @IsString()
  @Field()
  name: string;
}

@InputType()
export class CreatePaymentInput {
  @Field(() => Int)
  @IsNumber()
  orderId: number;

  @Field(() => Int)
  @IsNumber()
  amount: number;

  @Field(() => CreditCardDetails)
  @ValidateNested()
  @Type(() => CreditCardDetails)
  creditCardDetails: CreditCardDetails;
}
