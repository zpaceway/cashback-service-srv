import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessedOrderDto, UnprocessedOrderDto } from 'src/dto';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async processOrder(
    unprocessedOrder: UnprocessedOrderDto,
  ): Promise<ProcessedOrderDto> {
    const [prevOrdersCount, user] = await Promise.all([
      this.orderRepository.count({
        where: {
          userId: unprocessedOrder.user.id,
        },
        select: {
          id: true,
        },
      }),
      this.userRepository.findOne({
        where: {
          id: unprocessedOrder.user.id,
        },
      }),
    ]);

    if (!user) {
      await this.userRepository.insert({
        id: unprocessedOrder.user.id,
        firstName: unprocessedOrder.user.firstName,
        lastName: unprocessedOrder.user.lastName,
      });
    }

    const processedOrder = this.orderRepository.create({
      id: unprocessedOrder.id,
      userId: unprocessedOrder.user.id,
      value: unprocessedOrder.value,
      cashback: 0,
    });

    if (prevOrdersCount < 10) {
      processedOrder.cashback = processedOrder.value * 0;
    } else if (prevOrdersCount < 50) {
      processedOrder.cashback = processedOrder.value * 0.01;
    } else if (prevOrdersCount < 100) {
      processedOrder.cashback = processedOrder.value * 0.025;
    } else {
      processedOrder.cashback = processedOrder.value * 0.05;
    }

    await this.orderRepository.insert(processedOrder);

    return {
      id: processedOrder.id,
      user: {
        id: unprocessedOrder.user.id,
        firstName: unprocessedOrder.user.firstName,
        lastName: unprocessedOrder.user.lastName,
      },
      value: processedOrder.value,
      cashback: processedOrder.cashback,
    };
  }
}
