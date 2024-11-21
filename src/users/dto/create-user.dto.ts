import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsBoolean()
    isAdmin: boolean;

    @IsString()
    @IsNotEmpty()
    password: string;
}
