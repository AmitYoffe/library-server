import { IsDate, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class BorrowDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  bookId!: number;

  @IsDate()
  @ValidateIf((_object, value) => value !== null)
  returnedAt!: Date | null;
}
