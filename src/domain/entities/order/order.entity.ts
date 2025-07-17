import { Address } from './address.entity';
import OrderItem from './order-item.entity';
import { OrderStatus } from './order-status.entity';

// TODO: In hexagonal architecture maybe a good idea to remove the rich domain entity and use a DTO instead
export default class Order {
  private readonly _items: OrderItem[] = [];
  public constructor(
    public readonly id: string,
    public readonly customerId: number,
    private _status: OrderStatus,
    public readonly shippingAddress: Address,
    public readonly createdAt: Date = new Date(),
  ) {}

  public getStatus(): OrderStatus {
    return this._status;
  }

  public getAsJson() {
    return {
      id: this.id,
      customerId: this.customerId,
      status: this.getStatus(),
      shippingAddress: this.shippingAddress.getAsJson(),
      createdAt: this.createdAt,
      items: this._items.map((item) => item.getAsJson()),
    };
  }
}
