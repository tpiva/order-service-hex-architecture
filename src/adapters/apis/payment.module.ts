import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrderSchema } from '../database/schemas/order/order.schema';
import { EntityManager } from '@mikro-orm/core';
import { OrderRepository } from '../database/repositories/order/order.repository';
import { PaymentService } from './payment.service';

@Module({
  imports: [MikroOrmModule.forFeature([OrderSchema])],
  providers: [
    PaymentService,
    {
      provide: 'PAYMENT_SERVICE_TOKEN',
      useClass: PaymentService,
    },
    {
      provide: 'IOrderRepository',
      useFactory: (em: EntityManager) => new OrderRepository(em),
      inject: [EntityManager],
    },
  ],
  exports: ['PAYMENT_SERVICE_TOKEN'],
})
export class PaymentModule {}
