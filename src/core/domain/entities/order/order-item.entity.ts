export default class OrderItem {
  constructor(
    private readonly productId: number,
    private readonly quantity: number,
    private readonly price: number,
  ) {}

  public create(productId: number, quantity: number, price: number) {
    return Object.freeze(new OrderItem(productId, quantity, price));
  }
}
