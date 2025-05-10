import { Module } from '@nestjs/common';
import { OrderController } from './usecases/createOrder/order.controller';
import { CreateOrderUseCase } from './usecases/createOrder/createOrder.useCase';
@Module({
  providers: [CreateOrderUseCase],
  exports: [CreateOrderUseCase],
  controllers: [OrderController],
})
export class OrderModule {}
