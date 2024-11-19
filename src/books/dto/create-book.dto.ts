import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WriterEntity } from 'src/writers/writer.entity';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  writer: WriterEntity;

  @IsNumber()
  count: number;
}
