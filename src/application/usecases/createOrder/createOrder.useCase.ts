import { Address } from 'src/domain/entities/order/address.entity';
import { OrderStatus } from 'src/domain/entities/order/order-status.entity';
import Order from 'src/domain/entities/order/order.entity';
import UseCase from 'src/domain/usecases/usecase';

export class CreateOrderUseCase extends UseCase<
  CreateOrderUseCase.Input,
  CreateOrderUseCase.Output
> {
  execute(input: CreateOrderUseCase.Input): Promise<CreateOrderUseCase.Output> {
    const order = new Order(
      crypto.randomUUID(),
      input.customerId,
      OrderStatus.PENDING,
      new Address(
        input.address.street,
        input.address.city,
        input.address.state,
        input.address.number,
      ),
    );
    return Promise.resolve({ order });
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
