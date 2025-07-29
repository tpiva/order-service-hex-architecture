import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { OrderStatusSchema } from 'src/adapters/database/schemas/order/order-status.schema';
import { OrderStatus } from 'src/domain/entities/order/order-status.entity';

export class OrderStatusSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const orderPending = em.create(OrderStatusSchema, {
      status: OrderStatus.PENDING,
    });

    const orderPaid = em.create(OrderStatusSchema, {
      status: OrderStatus.PAID,
    });

    const orderCancelled = em.create(OrderStatusSchema, {
      status: OrderStatus.CANCELLED,
    });

    const orderShipped = em.create(OrderStatusSchema, {
      status: OrderStatus.SHIPPED,
    });

    await em.persistAndFlush([
      orderPending,
      orderPaid,
      orderCancelled,
      orderShipped,
    ]);
  }
}
