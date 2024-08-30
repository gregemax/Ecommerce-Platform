import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { UseGuards } from '@nestjs/common';
import { Guard } from 'src/auth/gurad/guard';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) { }

  @Query(returns => Cart)
  @UseGuards(Guard)
  async getCart(@Context() context): Promise<Cart> {
    const userId = context.req.user.id;
    return this.cartService.getCart(userId);
  }

  @Mutation(returns => Cart)
  @UseGuards(Guard)
  async addToCart(@Context() context, @Args('productId') productId: number, @Args('quantity') quantity: number): Promise<Cart> {
    const userId = context.req.user.id;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Mutation(returns => Boolean)
  @UseGuards(Guard)
  async removeFromCart(@Args('cartItemId') cartItemId: number): Promise<boolean> {
    await this.cartService.removeFromCart(cartItemId);
    return true;
  }
}
