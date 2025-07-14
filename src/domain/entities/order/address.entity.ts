export class Address {
  constructor(
    private readonly street: string,
    private readonly city: string,
    private readonly state: string,
    private readonly streetNumber: number,
  ) {}

  public createAddress(
    street: string,
    city: string,
    state: string,
    streetNumber: number,
  ) {
    return Object.freeze(new Address(street, city, state, streetNumber));
  }

  public getAsJson() {
    return {
      street: this.street,
      city: this.city,
      state: this.state,
      streetNumber: this.streetNumber,
    };
  }
}
