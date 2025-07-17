export default class OrderItem {
  constructor(
    private readonly productId: number,
    private readonly quantity: number,
    private readonly price: number,
  ) {}

  public getAsJson() {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }
}
