import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  writerId!: number;

  @IsNumber()
  count!: number;
}
