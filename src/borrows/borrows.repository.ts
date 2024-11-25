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

    // This returns 1 and not many 
    async getBorrowersByBook(bookId: number) {
        const borrowsByBookId = await this.borrowsRepository.find({
            where: { id: bookId }
        })

        // const borrowsByBookId = await this.borrowsRepository
        //     .createQueryBuilder('borrow')
        //     .where('borrow.bookId = :bookId', { bookId })
        //     .getMany();

        return borrowsByBookId
    }
}