import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, OrderResponseDto } from '../dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create an order and return tickets', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+1234567890',
        tickets: [
          {
            film: 'film1',
            session: 'session1',
            row: 1,
            seat: 5,
            price: 500,
          },
        ],
      };

      const mockOrderResponse: OrderResponseDto[] = [
        {
          id: 'order_123',
          film: 'film1',
          session: 'session1',
          row: 1,
          seat: 5,
          price: 500,
          daytime: new Date('2024-01-01T10:00:00Z'),
        },
      ];

      mockOrderService.createOrder.mockResolvedValue(mockOrderResponse);

      const result = await controller.createOrder(createOrderDto);

      expect(result).toEqual({
        total: 1,
        items: mockOrderResponse,
      });
      expect(service.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(service.createOrder).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple tickets', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+1234567890',
        tickets: [
          {
            film: 'film1',
            session: 'session1',
            row: 1,
            seat: 5,
            price: 500,
          },
          {
            film: 'film1',
            session: 'session1',
            row: 1,
            seat: 6,
            price: 500,
          },
        ],
      };

      const mockOrderResponse: OrderResponseDto[] = [
        {
          id: 'order_123',
          film: 'film1',
          session: 'session1',
          row: 1,
          seat: 5,
          price: 500,
          daytime: new Date('2024-01-01T10:00:00Z'),
        },
        {
          id: 'order_124',
          film: 'film1',
          session: 'session1',
          row: 1,
          seat: 6,
          price: 500,
          daytime: new Date('2024-01-01T10:00:00Z'),
        },
      ];

      mockOrderService.createOrder.mockResolvedValue(mockOrderResponse);

      const result = await controller.createOrder(createOrderDto);

      expect(result).toEqual({
        total: 2,
        items: mockOrderResponse,
      });
      expect(service.createOrder).toHaveBeenCalledWith(createOrderDto);
    });
  });
});

