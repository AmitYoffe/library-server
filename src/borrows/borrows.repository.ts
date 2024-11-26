import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BorrowEntity } from "src/Borrows";
import { Repository } from "typeorm";
import { BorrowDto } from "./dto/borrow.dto";

@Injectable()
export class BorrowsRepository {
    constructor(
        @InjectRepository(BorrowEntity)
        private borrowsRepository: Repository<BorrowEntity>,
    ) { }

    async create(borrow: BorrowDto) {
        const borrowEntity = this.borrowsRepository.create(borrow);
        return await this.borrowsRepository.save(borrowEntity);
    }

    async getBorrowersByBook(bookId: number) {
        const borrowsByBookId = await this.borrowsRepository.find({
            where: {
                book: {
                    id: bookId
                }
            },
        })

        return borrowsByBookId
    }
}