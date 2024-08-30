import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryGateway } from './inventory.gateway';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [InventoryService, InventoryGateway],
 exports:[InventoryService]

})
export class InventoryModule {}
