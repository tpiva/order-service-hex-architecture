import { IOrderRepository } from 'src/domain/repositories/iorder.repository';
import Order from 'src/domain/entities/order/order.entity';
import { Nullable } from 'src/domain/types/nullable.types';
import { EntityManager } from '@mikro-orm/core';
import { OrderStatus } from 'src/domain/entities/order/order-status.entity';
import { Logger } from '@nestjs/common';

export class OrderRepository implements IOrderRepository {
  private readonly logger = new Logger(OrderRepository.name);
  constructor(private readonly em: EntityManager) {}

  async updateOrderStatus(order: Order, newStatus: OrderStatus): Promise<void> {
    const em = this.em.fork();
    const { id } = order;
    try {
      const orderFromDb = await em.findOneOrFail(Order, { id });
      orderFromDb.status = newStatus;
      await em.persistAndFlush(orderFromDb);
    } catch (error) {
      this.logger.error('Error updating order:', error);
    }
  }

  async add(order: Order): Promise<Order> {
    await this.em.persistAndFlush(order);
    await this.em.refresh(order);

    return order;
  }

  async findById(id: number): Promise<Nullable<Order>> {
    return await this.em.findOne(
      Order,
      { id },
      { populate: ['items', 'shippingAddress'] },
    );
  }
}
