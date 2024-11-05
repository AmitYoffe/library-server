import { IsNotEmpty, IsString } from 'class-validator';
import Book from 'src/books/model';

export default class CreateWriterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;
  books: Book[];
  // profilePicture: string;
}
