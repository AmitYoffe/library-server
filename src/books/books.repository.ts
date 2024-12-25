import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
  ) {}

  findAll({ title, id }: SearchBookDto): Promise<BookEntity[]> {
    return this.booksRepository.find({
      select: ['id', 'title', 'count', 'writerId'],
      where: {
        ...(id ? { id } : {}),
        ...(title ? { title: ILike(`%${title}%`) } : {}),
      },
    });
  }

  async findOne(bookId: number) {
    const book = await this.booksRepository.findOneBy({ id: bookId });
    if (!book)
      throw new NotFoundException(`Book With Id of ${bookId} Not Found`);

    return book;
  }

  findAllById(id: number): Promise<BookEntity[]> {
    return this.booksRepository.find({
      where: { writer: { id } },
    });
  }

  create(bookDto: CreateBookDto) {
    const book = this.booksRepository.create(bookDto);
    return this.booksRepository.save(book);
  }

  async update(id: number, updatedBookDto: UpdateBookDto) {
    const bookToUpdate = await this.booksRepository.findOneBy({ id });
    if (!bookToUpdate) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    Object.assign(bookToUpdate, updatedBookDto);

    return this.booksRepository.save(bookToUpdate);
  }

  delete(id: number) {
    return this.booksRepository.delete(id);
  }
}
