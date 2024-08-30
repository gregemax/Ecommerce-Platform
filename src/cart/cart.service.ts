import { Injectable } from '@nestjs/common';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getCart(userId: number): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  }

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      cart = this.cartRepository.create({ user: { id: userId }, items: [] });
    }
    const product = await this.productRepository.findOne({where:{id:productId}});
    if (!product) throw new Error('Product not found');

    const cartItem = this.cartItemRepository.create({
      cart,
      product,
      quantity,
      price: product.price,
    });
    cart.items.push(cartItem);
    cart.totalPrice += product.price * quantity;

    await this.cartRepository.save(cart);
    return cart;
  }

  async removeFromCart(cartItemId: number): Promise<void> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });
    if (!cartItem) throw new Error('CartItem not found');

    cartItem.cart.totalPrice -= cartItem.price * cartItem.quantity;
    await this.cartRepository.save(cartItem.cart);
    await this.cartItemRepository.remove(cartItem);
  }
}
