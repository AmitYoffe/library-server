import { Injectable, NotFoundException } from '@nestjs/common';
import CreateWriterDto from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';
import Writer from './model';

@Injectable()
export class WritersService {
  private writers: Writer[] = [
    {
      id: 1,
      firstName: 'gever',
      secondName: 'gever',
      books: [],
    },
    {
      id: 2,
      firstName: 'gvara',
      secondName: 'geveret',
      books: [],
    },
  ];

  findAll(search?: string) {
    if (search) {
      // Todo: send lowercased writer in client
      const writersArrBySearch = this.writers.filter(
        (writer) =>
          writer.firstName.toLowerCase().includes(search) ||
          writer.secondName.toLowerCase().includes(search),
      );
      if (writersArrBySearch.length === 0) {
        throw new NotFoundException(`No Writers Found`);
      }
      return writersArrBySearch;
    }
    return this.writers;
  }

  findOne(id: number) {
    const writer = this.writers.find((writer) => writer.id === id);
    if (!writer)
      throw new NotFoundException(`Writer With Id of ${id} Not Found`);

    return writer;
  }

  create(writer: CreateWriterDto) {
    const writerByHighestId = [...this.writers].sort((a, b) => b.id - a.id);
    const newWriter = {
      id: writerByHighestId[0].id + 1,
      ...writer,
    };
    this.writers.push(newWriter);
    return newWriter;
  }

  update(id: number, updatedWriter: UpdateWriterDto) {
    this.writers = this.writers.map((writer) => {
      if (writer.id === id) {
        return { ...writer, ...updatedWriter };
      }
      return writer;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedWriter = this.findOne(id);
    this.writers = this.writers.filter((writer) => writer.id !== id);

    return removedWriter;
  }
}
