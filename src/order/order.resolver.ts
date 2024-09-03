import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { UseGuards } from '@nestjs/common';
import { Guard } from 'src/auth/gurad/guard';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(Guard)
  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context('req') req,
  ) {
    
    console.log(req.user.user);
    return this.orderService.create(createOrderInput, req.user.user.id);
  }

  // @Query(() => [Order], { name: 'order' })
  // findAll() {
  //   return this.orderService.findAll();
  // }

  // @Query(() => Order, { name: 'order' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.orderService.findOne(id);
  // }

  // @Mutation(() => Order)
  // updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
  //   return this.orderService.update(updateOrderInput.id, updateOrderInput);
  // }

  // @Mutation(() => Order)
  // removeOrder(@Args('id', { type: () => Int }) id: number) {
  //   return this.orderService.remove(id);
  // }
}
