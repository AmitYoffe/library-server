import Book from 'src/books/model';

export default class Writer {
  id: number;
  firstName: string;
  secondName: string;
  books: Book[];
}
