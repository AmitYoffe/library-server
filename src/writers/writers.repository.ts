import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from './dto';
import { WriterEntity } from './writer.entity';

@Injectable()
export class WritersRepository {
  constructor(
    @InjectRepository(WriterEntity)
    private readonly writersRepository: Repository<WriterEntity>,
  ) {}

  findAll({
    id,
    firstName,
    lastName,
  }: SearchWriterDto): Promise<WriterEntity[]> {
    return this.writersRepository.find({
      where: {
        ...(id ? { id } : {}),
        ...(lastName ? { lastName: ILike(`%${lastName}%`) } : {}),
        ...(firstName ? { firstName: ILike(`%${firstName}%`) } : {}),
      },
    });
  }

  findOne(id: number) {
    return this.writersRepository.findOne({
      where: { id },
      relations: {
        books: true,
      },
    });
  }

  findByBookId(bookId: number) {
    return this.writersRepository.findOne({
      where: {
        books: {
          id: bookId,
        },
      },
    });
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
