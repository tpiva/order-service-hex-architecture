import { Address } from 'src/domain/entities/order/address.entity';
import { OrderStatus } from 'src/domain/entities/order/order-status.entity';
import Order from 'src/domain/entities/order/order.entity';
import UseCase from 'src/domain/usecases/usecase';
import { Inject, Injectable } from '@nestjs/common';
import {
  IAddressRepository,
  IOrderRepository,
  IProductRepository,
} from 'src/domain/repositories/iorder.repository';
import OrderItem from 'src/domain/entities/order/order-item.entity';
import { Product } from 'src/domain/entities/order/product.entity';

@Injectable()
export class CreateOrderUseCase extends UseCase<
  CreateOrderUseCase.Input,
  CreateOrderUseCase.Output
> {
  constructor(
    @Inject('IAddressRepository')
    private readonly addressRepository: IAddressRepository,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
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
    // TODO: Move address to pre defined data in database
    const persistedAddress = await this.addressRepository.findOrCreate(address);
    const order = new Order(
      input.customerId,
      OrderStatus.PENDING,
      persistedAddress,
    );

    const products = await this.getProducts(
      input.items.map((item) => item.productId),
    );

    if (input.items && input.items.length > 0) {
      input.items.forEach((item) => {
        const orderItem = new OrderItem(
          products.find((p) => p.id === item.productId),
          item.quantity,
          item.price,
        );
        order.addItem(orderItem);
      });
    }

    const persistedOrder = await this.orderRepository.add(order);
    return { order: persistedOrder };
  }

  private async getProducts(productIds: number[]): Promise<Product[]> {
    const promises = productIds.map((productId) => {
      return this.productRepository.findById(productId);
    });

    return Promise.all(promises);
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateOrderUseCase {
  export class Input {
    customerId: number;
    items?: Array<{
      productId: number;
      quantity: number;
      price: number;
    }>;
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
