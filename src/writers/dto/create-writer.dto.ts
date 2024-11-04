import Book from 'src/books/model';

export default class CreateWriterDto {
  firstName: string;
  secondName: string;
  books: Book[];
}
