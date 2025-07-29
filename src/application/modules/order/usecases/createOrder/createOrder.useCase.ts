import { Address } from 'src/domain/entities/order/address.entity';
import { OrderStatus } from 'src/domain/entities/order/order-status.entity';
import Order from 'src/domain/entities/order/order.entity';
import UseCase from 'src/domain/usecases/usecase';
import { Inject, Injectable } from '@nestjs/common';
import {
  IAddressRepository,
  IOrderRepository,
} from 'src/domain/repositories/iorder.repository';

@Injectable()
export class CreateOrderUseCase extends UseCase<
  CreateOrderUseCase.Input,
  CreateOrderUseCase.Output
> {
  constructor(
    @Inject('IAddressRepository')
    private readonly addressRepository: IAddressRepository,
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {
    super();
  }

  async execute(
    input: CreateOrderUseCase.Input,
  ): Promise<CreateOrderUseCase.Output> {
    const address = new Address(
      input.address.street,
      input.address.city,
      input.address.state,
      input.address.number,
    );
    const persistedAddress = await this.addressRepository.findOrCreate(address);
    const order = new Order(
      crypto.randomUUID(),
      input.customerId,
      OrderStatus.PENDING,
      persistedAddress,
    );

    const persistedOrder = await this.orderRepository.add(order);
    return { order: persistedOrder };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateOrderUseCase {
  export class Input {
    customerId: number;
    address: {
      street: string;
      city: string;
      state: string;
      number: number;
    };
  }

  export class Output {
    order: Order;
  }
}
