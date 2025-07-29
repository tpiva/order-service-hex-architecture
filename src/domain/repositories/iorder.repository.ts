import { Nullable } from 'src/domain/types/nullable.types';
import Order from '../entities/order/order.entity';
import { Address } from '../../domain/entities/order/address.entity';

export interface IOrderRepository {
  add(order: Order): Promise<Order>;
  findById(id: string): Promise<Nullable<Order>>;
}

export interface IAddressRepository {
  findOrCreate(address: Address): Promise<Address>;
}
