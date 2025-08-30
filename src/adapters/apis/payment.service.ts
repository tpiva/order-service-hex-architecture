import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrderStatus } from 'src/domain/entities/order/order-status.entity';
import Order from 'src/domain/entities/order/order.entity';
import { IOrderRepository } from 'src/domain/repositories/iorder.repository';
import { IPaymentService } from 'src/domain/services/ipayment.service';

@Injectable()
export class PaymentService implements IPaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  public async updateStatusOrder(orderData: Order): Promise<void> {
    try {
      this.logger.log('Starting updating order to paid!');

      const orderId = orderData.id;
      if (!orderId) {
        throw new Error('Order ID not found in order data');
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await this.orderRepository.updateOrderStatus(orderData, OrderStatus.PAID);
      this.logger.log('Order updated to paid successfully!');
    } catch (error) {
      this.logger.error(`Error during updating order status to paid: ${error}`);
    }
  }
}
