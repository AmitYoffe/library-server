import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateBorrowDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    bookId: number;
}
