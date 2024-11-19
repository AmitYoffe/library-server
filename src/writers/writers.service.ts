import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from './dto';
import { WriterEntity } from './writer.entity';

@Injectable()
export class WritersService {
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

    if (!writer) throw new NotFoundException(`Writer With Id of ${id} Not Found`);

    return writer;
  }

  async create(writerDto: CreateWriterDto) {
    const writer = this.writersRepository.create(writerDto);
    return await this.writersRepository.save(writer)
  }

  async update(id: number, updatedWriter: UpdateWriterDto) {
    const writerToUpdate = await this.writersRepository.findOneBy({ id });
    if (!writerToUpdate) {
      throw new NotFoundException(`Writer with ID ${id} not found`);
    }
    Object.assign(writerToUpdate, updatedWriter);

    return await this.writersRepository.save(writerToUpdate);
  }

  async delete(id: number) {
    await this.writersRepository.delete(id);
  }
}
