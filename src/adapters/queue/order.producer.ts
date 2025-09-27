import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import Order from 'src/domain/entities/order/order.entity';

@Injectable()
export class OrderQueueProducer {
  private readonly logger = new Logger(OrderQueueProducer.name);
  constructor(@InjectQueue('order-processing') private orderQueue: Queue) {}

  async addOrderToQueue(orderData: Order) {
    const job = await this.orderQueue.add('process-order', orderData, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: 10,
      removeOnFail: 50,
    });
    this.logger.log(`Order job ${job.id} added to queue and cached`);
    return job;
  }

  async getQueueStatus() {
    const stats = {
      waiting: await this.orderQueue.getWaiting(),
      active: await this.orderQueue.getActive(),
      completed: await this.orderQueue.getCompleted(),
      failed: await this.orderQueue.getFailed(),
      timestamp: new Date(),
    };
    return stats;
  }
}
