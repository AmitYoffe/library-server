import { IsNotEmpty, IsString } from 'class-validator';
import { BookEntity } from 'src/books/book.entity';

export class CreateWriterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  books: BookEntity[];
  // profilePicture: string;
}
