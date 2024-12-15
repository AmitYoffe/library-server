import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WriterEntity } from './writer.entity';
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from './dto';

@Injectable()
export class WritersRepository {
  constructor(
    @InjectRepository(WriterEntity)
    private readonly writersRepository: Repository<WriterEntity>,
  ) {}

  // change this to not use query builder
  findAll({
    id,
    firstName,
    lastName,
  }: SearchWriterDto): Promise<WriterEntity[]> {
    const queryBuilder = this.writersRepository.createQueryBuilder('writer');

    if (id) {
      queryBuilder.andWhere('writer.id = :writerId', { writerId: id });
    }

    if (firstName) {
      queryBuilder.andWhere('writer.firstName ILIKE :firstName', {
        firstName: `%${firstName}%`,
      });
    }

    if (lastName) {
      queryBuilder.andWhere('writer.lastName ILIKE :lastName', {
        lastName: `%${lastName}%`,
      });
    }

    return queryBuilder.getMany();
  }

  findOne(id: number) {
    const writer = this.writersRepository.findOne({
      where: { id },
      relations: {
        books: true,
      },
    });

    return writer;
  }

  create(writerDto: CreateWriterDto) {
    const writer = this.writersRepository.create(writerDto);
    return this.writersRepository.save(writer);
  }

  update(updatedWriter: UpdateWriterDto) {
    return this.writersRepository.save(updatedWriter);
  }

  delete(id: number) {
    return this.writersRepository.delete(id);
  }
}
