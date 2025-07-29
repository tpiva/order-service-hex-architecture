import Order from './order.entity';

export default class OrderItem {
  public order?: Order;
  public id!: number;
  public productId: number;
  public quantity: number;
  public price: number;

  constructor(
    productId: number,
    quantity: number,
    price: number,
    order?: Order,
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.order = order;
  }

  public getAsJson() {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }
}
