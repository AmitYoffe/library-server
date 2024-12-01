import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/books";
import { BorrowEntity } from "src/Borrows";
import { Repository } from "typeorm";
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
            book: book,
        });

        return this.borrowsRepository.save(borrowEntity);
    }

    getBorrowersByBook(bookId: number) {
        const borrowsByBookId = this.borrowsRepository.find({
            where: { book: { id: bookId } }
        })

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