import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from './dto';
import { WriterEntity } from './writer.entity';
import { WritersRepository } from './writers.repository';

@Injectable()
export class WritersService {
  constructor(
    private readonly writersRepository: WritersRepository,
  ) { }

  async findAll({ id, firstName, lastName }: SearchWriterDto): Promise<WriterEntity[]> {
    return await this.writersRepository.findAll({ id, firstName, lastName });
  }

  async findOne(id: number) {
    const writer = await this.writersRepository.findOne(id);
    if (!writer) throw new NotFoundException(`Writer With Id of ${id} Not Found`);

    return writer;
  }

  async create(writerDto: CreateWriterDto) {
    return await this.writersRepository.create(writerDto)
  }

  async update(id: number, updatedWriter: UpdateWriterDto) {
    const writerToUpdate = await this.writersRepository.findOne(id);

    if (!writerToUpdate) {
      throw new NotFoundException(`Writer with ID ${id} not found`);
    }
    Object.assign(writerToUpdate, updatedWriter);

    return await this.writersRepository.update(writerToUpdate);
  }

  async delete(id: number) {
    await this.writersRepository.delete(id);
  }
}
