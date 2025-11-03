import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from '../services/films.service';
import { FilmResponseDto, ScheduleResponseDto } from '../dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn(),
    findByIdWithSchedules: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const mockFilms: FilmResponseDto[] = [
        {
          id: '1',
          title: 'Test Film',
          about: 'About',
          description: 'Description',
          director: 'Director',
          rating: 5,
          image: 'image.jpg',
          cover: 'cover.jpg',
          tags: ['tag1'],
        },
      ];

      const expectedResult = {
        total: 1,
        items: mockFilms,
      };

      mockFilmsService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByIdWithSchedules', () => {
    it('should return schedules for a film', async () => {
      const filmId = '1';
      const mockSchedules: ScheduleResponseDto[] = [
        {
          id: 'schedule1',
          daytime: '2024-01-01T10:00:00Z',
          hall: 1,
          rows: 10,
          seats: 20,
          price: 500,
          taken: [],
          film: filmId,
        },
      ];

      const mockServiceResponse = {
        schedule: mockSchedules,
      };

      mockFilmsService.findByIdWithSchedules.mockResolvedValue(
        mockServiceResponse,
      );

      const result = await controller.findByIdWithSchedules(filmId);

      expect(result).toEqual({
        total: 1,
        items: mockSchedules,
      });
      expect(service.findByIdWithSchedules).toHaveBeenCalledWith(filmId);
      expect(service.findByIdWithSchedules).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when film is not found', async () => {
      const filmId = '999';

      mockFilmsService.findByIdWithSchedules.mockResolvedValue(null);

      await expect(
        controller.findByIdWithSchedules(filmId),
      ).rejects.toThrow(NotFoundException);
      await expect(
        controller.findByIdWithSchedules(filmId),
      ).rejects.toThrow('Film not found');
    });

    it('should return empty array when film has no schedules', async () => {
      const filmId = '1';

      mockFilmsService.findByIdWithSchedules.mockResolvedValue({
        schedule: [],
      });

      const result = await controller.findByIdWithSchedules(filmId);

      expect(result).toEqual({
        total: 0,
        items: [],
      });
    });
  });
});

