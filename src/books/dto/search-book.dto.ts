import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchBookDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (typeof value === 'string' ? parseInt(value, 10) : value))
    id: number;

    @IsOptional()
    @IsString()
    title: string;
}
