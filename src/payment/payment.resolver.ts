import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { User } from 'src/user/entities/user.entity';
import { Guard } from 'src/auth/gurad/guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Mutation(() => Payment)
   @UseGuards(Guard)
  payment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
    @Context('req') req: any,
  ) {
    const { orderId, amount, creditCardDetails } = createPaymentInput;
    const userId = req.user.user.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    return this.paymentService.createCreditCardPayment(
      orderId,
      amount,
      creditCardDetails,
      userId,
    );
  }

  // @Query(() => [Payment], { name: 'payment' })
  // findAll() {
  //   return this.paymentService.findAll();
  // }

  // @Query(() => Payment, { name: 'payment' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.paymentService.findOne(id);
  // }

  @Mutation(() => Payment)
  updatePayment(
    @Args('updatePaymentId') id: number,
    @Args('updatePaymentstatus') status: PaymentStatus,
  ) {
    return this.paymentService.updatePaymentStatus(id, status);
  }

  // @Mutation(() => Payment)
  // removePayment(@Args('id', { type: () => Int }) id: number) {
  //   return this.paymentService.remove(id);
  // }
}
