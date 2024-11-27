import { Test, TestingModule } from '@nestjs/testing';
import { BooksRepository } from './books.repository';
import { BooksService, SearchBookDto } from './';

describe('BooksService', () => {
  let service: BooksService;
  let mockBooksRepository: { findAll: jest.Mock; };

  beforeEach(async () => {
    mockBooksRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: BooksRepository,
          useValue: mockBooksRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const searchDto: SearchBookDto = { title: 'Test Book', id: 1 };
      const result = [{ id: 1, title: 'Test Book', writerId: 1 }];
      mockBooksRepository.findAll.mockResolvedValue(result);

      const books = await service.findAll(searchDto);
      expect(books).toEqual(result);
    });
  });
});
