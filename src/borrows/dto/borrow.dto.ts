import { IsNotEmpty, IsNumber } from 'class-validator';

export class BorrowDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  bookId!: number;
}
