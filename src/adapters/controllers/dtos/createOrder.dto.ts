type AddressDto = {
  street: string;
  city: string;
  state: string;
  number: number;
};

export class CreateOrderParamsDto {
  customerId: number;
  address: AddressDto;
}

export class CreateOrderResponseDto {
  id: string;
  customerId: number;
  status: string;
  shippingAddress: AddressDto;
  createdAt: Date;
}
