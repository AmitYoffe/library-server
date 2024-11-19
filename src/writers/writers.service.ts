import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from './dto';
import { WriterEntity } from './writer.entity';

// do not need to use "ILike" ?
@Injectable()
export class WritersService {
  constructor(
    // each entity class should have a suffix of "entity" similar to DTO
    @InjectRepository(WriterEntity)
    private writersRepository: Repository<WriterEntity>,
  ) { }

  async findAll(searchQuery: SearchWriterDto) {
    let writersArrBySearch: WriterEntity[] = await this.writersRepository.find();

    // find how can i do this conditional searching using typeOrm instead
    if (searchQuery.id) {
      writersArrBySearch = writersArrBySearch.filter(writer => writer.id === searchQuery.id);
    }

    if (searchQuery.firstName) {
      writersArrBySearch = writersArrBySearch.filter(writer =>
        writer.firstName.toLowerCase().includes(searchQuery.firstName.toLowerCase())
      );
    }

    if (searchQuery.lastName) {
      writersArrBySearch = writersArrBySearch.filter(writer =>
        writer.lastName.toLowerCase().includes(searchQuery.lastName.toLowerCase())
      );
    }

    return writersArrBySearch;
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
