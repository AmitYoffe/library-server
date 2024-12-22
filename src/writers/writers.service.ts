import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from './dto';
import { WritersRepository } from './writers.repository';
import { WriterEntity } from './writer.entity';

@Injectable()
export class WritersService {
  constructor(private readonly writersRepository: WritersRepository) {}

  findAll({
    id,
    firstName,
    lastName,
  }: SearchWriterDto): Promise<WriterEntity[]> {
    return this.writersRepository.findAll({ id, firstName, lastName });
  }

  findOne(id: number) {
    const writer = this.writersRepository.findOne(id);
    if (!writer)
      throw new NotFoundException(`Writer With Id of ${id} Not Found`);

    return writer;
  }

  create(writerDto: CreateWriterDto) {
    this.writersRepository.create(writerDto);
  }

  async update(id: number, updatedWriter: UpdateWriterDto) {
    const writerToUpdate = await this.writersRepository.findOne(id);

    if (!writerToUpdate) {
      throw new NotFoundException(`Writer with ID ${id} not found`);
    }
    Object.assign(writerToUpdate, updatedWriter); // pass only changed updatedWriter and not full writerToUpdate that holds unchanged fields too, for some reason i can't

    this.writersRepository.update(writerToUpdate);
  }

  delete(id: number) {
    this.writersRepository.delete(id);
  }
}
