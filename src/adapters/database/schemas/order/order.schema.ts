import { EntitySchema } from '@mikro-orm/core';
import Order from '../../../../domain/entities/order/order.entity';
import { Address } from '../../../../domain/entities/order/address.entity';
import { OrderStatus } from '../../../../domain/entities/order/order-status.entity';

const OrderSchema = new EntitySchema<Order>({
  class: Order,
  tableName: 'orders',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    customerId: { type: 'number', fieldName: 'customer_id' },
    status: { type: 'string', enum: true, items: Object.values(OrderStatus) },
    shippingAddress: {
      entity: () => Address,
      kind: 'm:1',
      fieldName: 'shipping_address_id',
      nullable: false,
    },
    createdAt: { type: 'Date', fieldName: 'created_at' },
    items: {
      kind: '1:m',
      entity: () => 'OrderItem',
      mappedBy: 'order',
    },
  },
});

export { OrderSchema };
