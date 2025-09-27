import { ApiProperty } from '@nestjs/swagger';

class AddressDto {
  @ApiProperty()
  street: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  number: number;
}

class AddressResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  street: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  number: number;
}

class OrderItemDto {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: number;
}

class ProductResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

class OrderItemResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty({ type: () => ProductResponseDto })
  product: ProductResponseDto;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: number;
}

export class CreateOrderParamsDto {
  @ApiProperty()
  customerId: number;
  @ApiProperty({ type: () => AddressDto })
  address: AddressDto;
  @ApiProperty({ type: () => OrderItemDto, isArray: true })
  items?: OrderItemDto[];
}

export class CreateOrderResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  status: string;
  @ApiProperty({ type: () => AddressResponseDto })
  shippingAddress: AddressResponseDto;
  @ApiProperty({ type: () => OrderItemResponseDto, isArray: true })
  items: OrderItemResponseDto[];
  @ApiProperty()
  createdAt: Date;
}
