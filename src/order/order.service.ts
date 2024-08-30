import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { orderItems } from './entities/orderItem.entity';
import { shippingPlace } from './entities/shipping.entity';
import { Cart, CartItem } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderrepo: Repository<Order>,
    @InjectRepository(orderItems) private orderitemrepo: Repository<orderItems>,
    @InjectRepository(shippingPlace)
    private shippingPlacerepo: Repository<shippingPlace>,
    @InjectRepository(Cart) private Cartrepo: Repository<Cart>,
    @InjectRepository(User) private Userrepo: Repository<User>,
  ) {}
  async create(createOrderInput: CreateOrderInput,userid:number) {
    const cart = await this.Cartrepo.findOne({
      where: { id: createOrderInput.cartId },
      relations: { items: true, user: true },
    });
    if (!cart) throw new NotFoundException('cart not found');



    let shipped = createOrderInput.shippingplace;
    const shippingPlace = await this.shippingPlacerepo.save(shipped);
      const user=await this.Userrepo.findOne({where:{id:userid},relations:{cart:true}})

    let order = this.orderrepo.create({
      
    })

    order.shippingPlace = shippingPlace
    order.cart = cart
    order.orderAt = new Date(Date.now())
    order.user = user
    
    
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
