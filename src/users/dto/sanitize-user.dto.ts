import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BorrowEntity } from 'src/borrows';

export class BalmasizedUserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    borrows: BorrowEntity[];
}

// delete this dto?