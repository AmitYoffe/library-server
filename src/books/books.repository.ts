import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookEntity } from "./book.entity";
import { CreateBookDto, SearchBookDto, UpdateBookDto } from "./dto";

@Injectable()
export class BooksRepository {
    constructor(
        @InjectRepository(BookEntity)
        private readonly booksRepository: Repository<BookEntity>,
    ) { }

    findAll({ title, id }: SearchBookDto) {
        const queryBuilder = this.booksRepository.createQueryBuilder("book");

        if (id) {
            queryBuilder.andWhere("book.id = :bookId", { bookId: id });
        }

        if (title) {
            queryBuilder.andWhere("book.title ILIKE :title", { title: `%${title}%` });
        }

        return queryBuilder.getMany();
    }

    findOne(bookId: number) {
        return this.booksRepository.findOneBy({ id: bookId });
    }

    create(bookDto: CreateBookDto) {
        const book = this.booksRepository.create(bookDto);
        return this.booksRepository.save(book);
    }

    async update(id: number, updatedBookDto: UpdateBookDto) {
        const bookToUpdate = await this.booksRepository.findOneBy({ id });
        if (!bookToUpdate) {
            return null;
        }
        Object.assign(bookToUpdate, updatedBookDto);

        return this.booksRepository.save(bookToUpdate);
    }

    delete(id: number) {
        return this.booksRepository.delete(id);
    }
}
