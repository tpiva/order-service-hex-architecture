import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from 'src/application/usecases/createOrder/createOrder.useCase';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [CreateOrderUseCase],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order successfully', async () => {
    const result = await controller.createOrder({
      customerId: 1,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        number: 123,
      },
    });

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.customerId).toBe(1);
    expect(result.status).toBe('PENDING');
    expect(result.shippingAddress).toBeDefined();
    expect(result.shippingAddress.street).toBe('123 Main St');
    expect(result.shippingAddress.city).toBe('Anytown');
    expect(result.shippingAddress.state).toBe('CA');
    expect(result.createdAt).toBeDefined();
  });
});
