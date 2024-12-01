import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
  ) { }

  findAll({ title, id }: SearchBookDto) {
    return this.booksRepository.findAll({ title, id });
  }

  findOne(id: number) {
    const book = this.booksRepository.findOne(id);
    if (!book) throw new NotFoundException(`Book With Id of ${id} Not Found`);

    return book;
  }

  create(bookDto: CreateBookDto) {
    this.booksRepository.create(bookDto)
  }

  async update(id: number, updatedBookDto: UpdateBookDto) {
    const updatedBook = await this.booksRepository.update(id, updatedBookDto);

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  delete(id: number) {
    this.booksRepository.delete(id);
  }
}
