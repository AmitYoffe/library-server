import { IsNotEmpty, IsString } from 'class-validator';
import Writer from 'src/writers/model';

export default class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  writer: Writer;
  // picture: string;
}
