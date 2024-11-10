import { IsNotEmpty, IsString } from 'class-validator';
import { Book } from 'src/books/book.entity';

export default class CreateWriterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  books: Book[];
  // profilePicture: string;
}
