import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import Order from 'src/domain/entities/order/order.entity';
import { IPaymentService } from 'src/domain/services/ipayment.service';

@Processor('order-processing')
export class OrderQueueConsumer extends WorkerHost {
  private readonly logger = new Logger(OrderQueueConsumer.name);

  constructor(
    @Inject('PAYMENT_SERVICE_TOKEN')
    private readonly paymentService: IPaymentService,
  ) {
    super();
  }

  async process(job: Job<Order, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
    this.logger.debug('Job data:', JSON.stringify(job.data, null, 2));

    try {
      await job.updateProgress(10);

      const result = await this.paymentService.updateStatusOrder(
        job.data as Order,
      );

      await job.updateProgress(100);
      this.logger.log(`Job ${job.id} processed successfully.`);

      return result;
    } catch (error) {
      this.logger.error(`Failed to process job ${job.id}:`, error.message);
      this.logger.debug('Error stack:', error.stack);

      throw error;
    }
  }

  async onCompleted(job: Job, result: any) {
    this.logger.log(`Job ${job.id} completed with result:`, result);
  }

  async onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} failed:`, error.message);
  }

  async onStalled(job: Job) {
    this.logger.warn(`Job ${job.id} stalled`);
  }
}
