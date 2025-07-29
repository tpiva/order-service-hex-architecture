import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateOrderParamsDto,
  CreateOrderResponseDto,
} from './dtos/createOrder.dto';
import { CreateOrderUseCase } from 'src/application/modules/order/usecases/createOrder/createOrder.useCase';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
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
        street: address['street'],
        city: address['city'],
        state: address['state'],
        number: address['streetNumber'],
      },
      createdAt: result.order.createdAt,
    };
  }
}
