import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
  ) {}

  private async processExternalPayment(
    amount: number,
    creditCardDetails: any,
  ): Promise<string> {
    if (!creditCardDetails || !creditCardDetails.number) {
      throw new BadRequestException('Invalid credit card details');
    }

    return `transaction-id-${new Date(Date.now())}`;
  }

  async createCreditCardPayment(
    order: number,
    amount: number,
    creditCardDetails: {
      number: string;
      expiry: string;
      cvv: string;
      name: string;
    },
    userid: number,
  ): Promise<Payment> {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero.');
    }

    const transactionId = await this.processExternalPayment(
      amount,
      creditCardDetails,
    );

    const user = await this.userRepository.findOneBy({ id: userid });
    const orders = await this.OrderRepository.findOneBy({ id: order });

    const payment = this.paymentRepository.create({
      amount,
      method: 'credit card',
      status: PaymentStatus.COMPLETED,
      transactionId,
      user,
    });
    payment.order = orders;
    return this.paymentRepository.save(payment);
  }

  async updatePaymentStatus(
    paymentId: number,
    status: PaymentStatus,
  ): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${paymentId} not found.`);
    }

    payment.status = status;
    return this.paymentRepository.save(payment);
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async getPaymentById(paymentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${paymentId} not found.`);
    }

    return payment;
  }
}
