import Book from 'src/books/model';

export default interface Writer {
  id: number;
  firstName: string;
  secondName: string;
  books: Book[];
}
