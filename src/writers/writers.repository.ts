import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WriterEntity } from "./writer.entity";
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from "./dto";

@Injectable()
export class WritersRepository {
    constructor(
        @InjectRepository(WriterEntity)
        private writersRepository: Repository<WriterEntity>,
    ) { }

    async findAll({ id, firstName, lastName }: SearchWriterDto): Promise<WriterEntity[]> {
        const queryBuilder = this.writersRepository.createQueryBuilder('writer');

        if (id) {
            queryBuilder.andWhere('writer.id = :writerId', { writerId: id });
        }

        if (firstName) {
            queryBuilder.andWhere('writer.firstName ILIKE :firstName', { firstName: `%${firstName}%` });
        }

        if (lastName) {
            queryBuilder.andWhere('writer.lastName ILIKE :lastName', { lastName: `%${lastName}%` });
        }

        return await queryBuilder.getMany();
    }

    async findOne(id: number) {
        const writer = await this.writersRepository.findOne({
            where: { id },
            relations: ['books']
        });

        return writer;
    }

    async create(writerDto: CreateWriterDto) {
        const writer = this.writersRepository.create(writerDto);
        return await this.writersRepository.save(writer)
    }

    async update(updatedWriter: UpdateWriterDto) {
        return await this.writersRepository.save(updatedWriter);
    }

    async delete(id: number) {
        await this.writersRepository.delete(id);
    }
}