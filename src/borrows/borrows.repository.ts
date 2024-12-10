import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/books/book.entity";
import { Repository } from "typeorm";
import { BorrowEntity } from "./borrow.entity";
import { BorrowDto } from "./dto/borrow.dto";

@Injectable()
export class BorrowsRepository {
    constructor(
        @InjectRepository(BorrowEntity)
        private borrowsRepository: Repository<BorrowEntity>,
    ) { }

    async create(borrow: BorrowDto, book: BookEntity) {
        const borrowEntity = this.borrowsRepository.create({
            userId: borrow.userId,
            book,
        });

        return this.borrowsRepository.save(borrowEntity);
    }

    async getBorrowersByBook(bookId: number) {
        const borrowsByBookId = await this.borrowsRepository.find({
            where: { book: { id: bookId } }
        })

        if (borrowsByBookId.length === 0) {
            throw new NotFoundException("This book hasn't been borrowed yet");
        }

        return borrowsByBookId
    }

    countUserBorrows({ bookId, userId }: BorrowDto) {
        const borrowCount = this.borrowsRepository.count({
            where: {
                user: { id: userId },
                book: { id: bookId }
            }
        })

        return borrowCount
    }
}