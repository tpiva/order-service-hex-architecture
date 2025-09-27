import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from './createOrder.useCase';
import { IAddressRepository } from 'src/domain/repositories/iorder.repository';
import { Address } from 'src/domain/entities/order/address.entity';
import { OrderQueueProducer } from 'src/adapters/queue/order.producer';

describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;
  let addressRepository: jest.Mocked<IAddressRepository>;

  beforeEach(async () => {
    addressRepository = {
      findOrCreate: jest.fn(async (address: Address) => address),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUseCase,
        { provide: 'IAddressRepository', useValue: addressRepository },
        {
          provide: 'IProductRepository',
          useValue: { findById: jest.fn() },
        },
        {
          provide: 'IOrderRepository',
          useValue: { add: jest.fn((order) => Promise.resolve(order)) },
        },
        {
          provide: OrderQueueProducer,
          useValue: { addOrderToQueue: jest.fn() },
        },
      ],
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
      items: [],
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
