import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InventoryService } from './inventory.service';
import { Server } from 'socket.io';
import { forwardRef, Inject } from '@nestjs/common';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class InventoryGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,
  ) {}

  @SubscribeMessage('checkStock')
  async checkStock(@MessageBody() productId: number): Promise<number> {
    const stock = await this.inventoryService.getStock(productId);
    return stock;
  }

  broadcastStockChange(productId: number, newStock: number): void {
    this.server.emit('stockUpdated', { productId, newStock });
  }
}
