import Order from '../entities/order/order.entity';

export interface IPaymentService {
  updateStatusOrder(order: Order): Promise<void>;
}
