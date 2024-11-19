import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) { }

  async findAll({ title, id }: SearchBookDto) {
    const queryBuilder = this.booksRepository.createQueryBuilder('book');

    if (id) {
      queryBuilder.andWhere('book.id = :bookId', { bookId: id });
    }

    if (title) {
      queryBuilder.andWhere('book.title ILIKE :title', { title: `%${title}%` });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) throw new NotFoundException(`Book With Id of ${id} Not Found`);

    return book;
  }

  async create(bookDto: CreateBookDto) {
    const book = this.booksRepository.create(bookDto);
    return await this.booksRepository.save(book)
  }

  async update(id: number, updatedBookDto: UpdateBookDto) {
    const bookToUpdate = await this.booksRepository.findOneBy({ id });
    if (!bookToUpdate) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    Object.assign(bookToUpdate, updatedBookDto);

    return await this.booksRepository.save(bookToUpdate);
  }

  async delete(id: number) {
    await this.booksRepository.delete(id);
  }
}
