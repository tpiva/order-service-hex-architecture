import Order from 'src/core/domain/entities/order/order.entity';
import { Nullable } from 'src/core/types/nullable.types';

export interface IOrderRepository {
  add(order: Order): Promise<void>;
  findById(id: string): Promise<Nullable<Order>>;
}
