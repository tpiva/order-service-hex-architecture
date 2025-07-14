import Order from 'src/domain/entities/order/order.entity';
import UseCase from 'src/domain/usecases/usecase';

export class CreateOrderUseCase extends UseCase<
  CreateOrderUseCase.Input,
  CreateOrderUseCase.Output
> {
  execute(input: CreateOrderUseCase.Input): Promise<CreateOrderUseCase.Output> {
    const order = Order.create({
      customerId: input.customerId,
      shippingAddress: {
        street: input.address.street,
        city: input.address.city,
        state: input.address.state,
        number: input.address.number,
      },
    });
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
