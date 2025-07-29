import { EntitySchema } from '@mikro-orm/core';
import OrderItem from '../../../../domain/entities/order/order-item.entity';

const OrderItemSchema = new EntitySchema<OrderItem>({
  class: OrderItem,
  tableName: 'order_items',
  properties: {
    id: { type: 'number', primary: true },
    productId: { type: 'number', fieldName: 'product_id' },
    quantity: { type: 'number' },
    price: { type: 'number' },
    order: {
      kind: 'm:1',
      entity: () => 'Order',
      fieldName: 'order_id', // DB column
    },
  },
});

export { OrderItemSchema };
