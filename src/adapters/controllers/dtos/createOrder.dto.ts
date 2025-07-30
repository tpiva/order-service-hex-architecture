type AddressDto = {
  street: string;
  city: string;
  state: string;
  number: number;
};

type AddressResponseDto = {
  id: number;
  street: string;
  city: string;
  state: string;
  number: number;
};

type OrderItemDto = {
  productId: number;
  quantity: number;
  price: number;
};

type OrderItemResponseDto = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
};

export class CreateOrderParamsDto {
  customerId: number;
  address: AddressDto;
  items?: OrderItemDto[];
}

export class CreateOrderResponseDto {
  id: number;
  customerId: number;
  status: string;
  shippingAddress: AddressResponseDto;
  items: OrderItemResponseDto[];
  createdAt: Date;
}
