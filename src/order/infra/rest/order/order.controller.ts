import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderUseCase } from '../../../usecases/createOrder/createOrder.useCase';
import { omit } from 'lodash';
import {
  CreateOrderParamsDto,
  CreateOrderResponseDto,
} from './dtos/createOrder.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderParamsDto,
  ): Promise<CreateOrderResponseDto> {
    const result = await this.createOrderUseCase.execute(createOrderDto);

    const rawAddress = result.order.shippingAddress.getAsJson();
    return {
      id: result.order.id,
      customerId: result.order.customerId,
      status: result.order.getStatus(),
      shippingAddress: {
        ...omit(rawAddress, 'streetNumber'),
        streetNumber: rawAddress.streetNumber.toString(),
      },
      createdAt: result.order.createdAt,
    };
  }
}
