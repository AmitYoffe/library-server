import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository,
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
    return await this.booksRepository.create(bookDto)
  }

  async update(id: number, updatedBookDto: UpdateBookDto) {
    const updatedBook = await this.booksRepository.update(id, updatedBookDto);
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async delete(id: number) {
    await this.booksRepository.delete(id);
  }
}
