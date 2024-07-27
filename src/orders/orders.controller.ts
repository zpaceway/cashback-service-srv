import { Body, Controller, Post } from '@nestjs/common';
import { UnprocessedOrderDto } from 'src/dto';
import { OrdersService } from './orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('process')
  processOrder(@Body() unprocessedOrder: UnprocessedOrderDto) {
    return this.ordersService.processOrder(unprocessedOrder);
  }
}
