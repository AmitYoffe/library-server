import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Writer } from 'src/writers/writer.entity';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  writer: Writer;
  // picture: string;

  @IsNumber()
  count: number;
}
