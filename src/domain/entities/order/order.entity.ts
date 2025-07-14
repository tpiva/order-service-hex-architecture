import { Address } from './address.entity';
import OrderItem from './order-item.entity';
import { OrderStatus } from './order-status.entity';
import * as crypto from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderCommand {
  export interface Create {
    customerId: number;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      number: number;
    };
  }
}

// TODO: In hexagonal architecture maybe a good idea to remove the rich domain entity and use a DTO instead
export default class Order {
  private readonly _items: OrderItem[] = [];
  public constructor(
    public readonly id: string, // TODO: change to OrderId
    public readonly customerId: number,
    private _status: OrderStatus,
    public readonly shippingAddress: Address,
    public readonly createdAt: Date = new Date(),
  ) {}

  static create(command: OrderCommand.Create): Order {
    return new Order(
      crypto.randomUUID(),
      command.customerId,
      OrderStatus.PENDING,
      new Address(
        command.shippingAddress.street,
        command.shippingAddress.city,
        command.shippingAddress.state,
        command.shippingAddress.number,
      ),
      new Date(),
    );
  }

  public getStatus(): OrderStatus {
    return this._status;
  }
}
