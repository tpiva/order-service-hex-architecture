import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CreateOrderUseCase } from './usecases/createOrder/createOrder.useCase';
import { OrderController } from 'src/adapters/controllers/order.controller';
import { Address } from 'src/domain/entities/order/address.entity';
import { AddressRepository } from 'src/adapters/database/repositories/address.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Address])],
  providers: [
    CreateOrderUseCase,
    {
      provide: 'IAddressRepository',
      useClass: AddressRepository,
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
