import { Address } from './address.entity';
import OrderItem from './order-item.entity';
import { OrderStatus } from './order-status.entity';
import { Collection } from '@mikro-orm/core';

// TODO: In hexagonal architecture maybe a good idea to remove the rich domain entity and use a DTO instead
export default class Order {
  private readonly _items = new Collection<OrderItem>(this);
  public shippingAddress!: Address;
  public readonly id: number;

  public constructor(
    public readonly customerId: number,
    public readonly status: OrderStatus,
    shippingAddress: Address,
    public readonly createdAt: Date = new Date(),
  ) {
    this.shippingAddress = shippingAddress;
  }

  public get items(): OrderItem[] {
    return this._items.getItems();
  }

  public set items(items: OrderItem[]) {
    this._items.set(items);
  }

  public addItem(item: OrderItem): void {
    this._items.add(item);
  }

  public getAsJson() {
    return {
      id: this.id,
      customerId: this.customerId,
      status: this.status,
      shippingAddress: this.shippingAddress.getAsJson(),
      createdAt: this.createdAt,
      items: this._items.getItems().map((item) => item.getAsJson()),
    };
  }
}
