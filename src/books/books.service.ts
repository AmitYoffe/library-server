import { Injectable, NotFoundException } from '@nestjs/common';
import CreateBookDto from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import Book from './model';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  findAll(search?: string) {
    if (search) {
      // Todo: send lowercased book in client
      const booksArrBySearch = this.books.filter((book) =>
        book.title.toLowerCase().includes(search),
      );
      if (booksArrBySearch.length === 0) {
        throw new NotFoundException(`No Books Found`);
      }
      return booksArrBySearch;
    }
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) throw new NotFoundException(`Book With Id of ${id} Not Found`);

    return book;
  }

  create(book: CreateBookDto) {
    const bookByHighestId = [...this.books].sort((a, b) => b.id - a.id);
    const newBook = {
      id: bookByHighestId[0].id + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updatedBook: UpdateBookDto) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return { ...book, ...updatedBook };
      }
      return book;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedBook = this.findOne(id);
    this.books = this.books.filter((book) => book.id !== id);

    return removedBook;
  }
}
