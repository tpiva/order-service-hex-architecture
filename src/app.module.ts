import { Module } from '@nestjs/common';
import { OrderController } from './adapters/controllers/order.controller';
import { CreateOrderUseCase } from './application/usecases/createOrder/createOrder.useCase';

@Module({
  controllers: [OrderController],
  providers: [CreateOrderUseCase],
})
export class AppModule {}
