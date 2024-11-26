import { Injectable, NotFoundException } from '@nestjs/common';
import { WritersRepository } from 'src/writers';
import { BooksRepository } from './books.repository';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly writersRepository: WritersRepository
  ) { }

  async findAll({ title, id }: SearchBookDto) {
    return await this.booksRepository.findAll({ title, id });
  }

  async findOne(id: number) {
    const book = await this.booksRepository.findOne(id);
    if (!book) throw new NotFoundException(`Book With Id of ${id} Not Found`);

    return book;
  }

  async create(bookDto: CreateBookDto) {
    const writer = await this.writersRepository.findOne(bookDto.writerId);
    if (!writer) {
      throw new NotFoundException(`Writer not found`);
    }

    await this.booksRepository.create(bookDto)
  }

  async update(id: number, updatedBookDto: UpdateBookDto) {
    const updatedBook = await this.booksRepository.update(id, updatedBookDto);

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async delete(id: number) {
    await this.booksRepository.delete(id);
  }
}

// remove unnecessary awaits and syncs