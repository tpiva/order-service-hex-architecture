import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from './createOrder.useCase';
describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateOrderUseCase],
    }).compile();

    useCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an order successfully', async () => {
    const input = {
      customerId: 1,
      address: {
        street: 'Test Street',
        city: 'Test City',
        state: 'Test State',
        number: 123,
      },
    };

    const result = await useCase.execute(input);

    expect(result).toBeDefined();
    expect(result.order).toBeDefined();
    expect(result.order.customerId).toBe(input.customerId);
    expect(result.order.shippingAddress).toEqual({
      street: input.address.street,
      city: input.address.city,
      state: input.address.state,
      streetNumber: input.address.number,
    });
  });
});
