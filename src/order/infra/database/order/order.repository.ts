import Order from 'src/core/domain/entities/order/order.entity';
import { IOrderRepository } from 'src/core/domain/repositories/iorder.repository';
import { Nullable } from 'src/core/types/nullable.types';

export default class OrderRepository implements IOrderRepository {
  findById(id: string): Promise<Nullable<Order>> {
    throw new Error('Method not implemented.');
  }
  async add(order: Order): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
