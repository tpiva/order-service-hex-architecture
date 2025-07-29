import { EntitySchema } from '@mikro-orm/core';
import { OrderStatus } from '../../../../domain/entities/order/order-status.entity';

class OrderStatusEntity {
  id!: number;
  status!: OrderStatus;
}

export const OrderStatusSchema = new EntitySchema<OrderStatusEntity>({
  class: OrderStatusEntity,
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    status: { type: 'string', enum: true, items: () => OrderStatus },
  },
});
