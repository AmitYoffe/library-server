import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { UpdateBookDto, CreateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) { }

  // search type shouldnt be string ?
  // Todo: send lowercased book in client?
  async findAll(search?: string) {
    let booksArrBySearch: BookEntity[];

    if (search) {
      booksArrBySearch = await this.booksRepository.find({
        where: {
          title: ILike(`%${search}%`),
        },
      });
    } else {
      booksArrBySearch = await this.booksRepository.find()
    }

    if (booksArrBySearch.length === 0) {
      throw new NotFoundException(`No Books Found`);
    }

    return booksArrBySearch;
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
