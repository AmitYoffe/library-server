import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import CreateWriterDto from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';
import { Writer } from './writer.entity';

@Injectable()
export class WritersService {
  constructor(
    @InjectRepository(Writer)
    private writersRepository: Repository<Writer>,
  ) { }

  async findAll(search?: string) {
    let writersArrBySearch: Writer[];

    if (search) {
      writersArrBySearch = await this.writersRepository.find({
        where: [
          { firstName: ILike(`%${search}%`) },
          { secondName: ILike(`%${search}%`) }
        ],
      });
    } else {
      writersArrBySearch = await this.writersRepository.find()
    }

    if (writersArrBySearch.length === 0) {
      throw new NotFoundException(`No Writers Found`);
    }

    return writersArrBySearch;
  }

  async findOne(id: number) {
    const writer = await this.writersRepository.findOneBy({ id })
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
