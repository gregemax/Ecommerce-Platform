import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { InventoryGateway } from './inventory.gateway';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private inventoryGateway: InventoryGateway, 
  ) {}
  async decreaseStock(productId: number, quantity: number): Promise<Product> {
    const product = await this.productRepository.findOne({where:{id:productId}});

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    product.stock -= quantity;
    const updatedProduct = await this.productRepository.save(product);


    this.inventoryGateway.broadcastStockChange(product.id, product.stock);

    return updatedProduct;
  }


  async increaseStock(productId: number, quantity: number): Promise<Product> {
    const product = await this.productRepository.findOne({where:{id:productId}});

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.stock += quantity;
    const updatedProduct = await this.productRepository.save(product);

    this.inventoryGateway.broadcastStockChange(product.id, product.stock);

    return updatedProduct;
  }


  async getStock(productId: number): Promise<number> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product.stock;
  }
}
