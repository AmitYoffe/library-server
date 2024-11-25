import { IsNotEmpty, IsNumber } from 'class-validator';

export default class BorrowDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    bookId: number;
}
