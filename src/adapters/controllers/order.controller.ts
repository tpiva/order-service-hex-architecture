import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateOrderParamsDto,
  CreateOrderResponseDto,
} from './dtos/createOrder.dto';
import { CreateOrderUseCase } from 'src/application/modules/order/usecases/createOrder/createOrder.useCase';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: CreateOrderResponseDto,
  })
  async createOrder(
    @Body() createOrderDto: CreateOrderParamsDto,
  ): Promise<CreateOrderResponseDto> {
    const result = await this.createOrderUseCase.execute(createOrderDto);

    const address = result.order.shippingAddress;
    return {
      id: result.order.id,
      customerId: result.order.customerId,
      status: result.order.status,
      shippingAddress: {
        id: address.id,
        street: address['street'],
        city: address['city'],
        state: address['state'],
        number: address['streetNumber'],
      },
      items: result.order.items.map((item) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
        },
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: result.order.createdAt,
    };
  }
}
