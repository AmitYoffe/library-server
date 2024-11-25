import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookEntity } from "./book.entity";
import { CreateBookDto, UpdateBookDto, SearchBookDto } from "./dto";

@Injectable()
export class BooksRepository {
    constructor(
        @InjectRepository(BookEntity)
        private readonly booksRepository: Repository<BookEntity>,
    ) { }

    async findAll({ title, id }: SearchBookDto) {
        const queryBuilder = this.booksRepository.createQueryBuilder("book");

        if (id) {
            queryBuilder.andWhere("book.id = :bookId", { bookId: id });
        }

        if (title) {
            queryBuilder.andWhere("book.title ILIKE :title", { title: `%${title}%` });
        }

        return await queryBuilder.getMany();
    }

    async findOne(bookId: number) {
        return await this.booksRepository.findOneBy({ id: bookId });
    }

    async create(bookDto: CreateBookDto) {
        const book = this.booksRepository.create(bookDto);
        return await this.booksRepository.save(book);
    }

    async update(id: number, updatedBookDto: UpdateBookDto) {
        const bookToUpdate = await this.booksRepository.findOneBy({ id });
        if (!bookToUpdate) {
            return null;
        }
        Object.assign(bookToUpdate, updatedBookDto);

        return await this.booksRepository.save(bookToUpdate);
    }

    async delete(id: number) {
        return await this.booksRepository.delete(id);
    }
}
