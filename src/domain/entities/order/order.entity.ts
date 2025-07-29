import { Address } from './address.entity';
import OrderItem from './order-item.entity';
import { OrderStatus } from './order-status.entity';

// TODO: In hexagonal architecture maybe a good idea to remove the rich domain entity and use a DTO instead
export default class Order {
  private readonly _items: OrderItem[] = [];
  public shippingAddress!: Address;
  public constructor(
    public readonly id: string,
    public readonly customerId: number,
    private _status: OrderStatus,
    shippingAddress: Address,
    public readonly createdAt: Date = new Date(),
  ) {
    this.shippingAddress = shippingAddress;
  }

  public get status(): OrderStatus {
    return this._status;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public addItem(item: OrderItem): void {
    this._items.push(item);
  }

  public getAsJson() {
    return {
      id: this.id,
      customerId: this.customerId,
      status: this.status,
      shippingAddress: this.shippingAddress.getAsJson(),
      createdAt: this.createdAt,
      items: this._items.map((item) => item.getAsJson()),
    };
  }
}
