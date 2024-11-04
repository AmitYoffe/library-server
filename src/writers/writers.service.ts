import { Injectable } from '@nestjs/common';
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
      return this.writers.filter(
        (writer) =>
          writer.firstName.toLowerCase().includes(search) ||
          writer.secondName.toLowerCase().includes(search),
      );
    }
    return this.writers;
  }

  findOne(id: string) {
    const writer = this.writers.find((writer) => writer.id === Number(id));
    return writer;
  }

  create(writer: Writer) {
    const writerByHighestId = [...this.writers].sort((a, b) => (b.id - a.id));
    const newWriter = {
      id: writerByHighestId[0].id + 1,
      ...writer,
    };
    this.writers.push(newWriter);
    return newWriter;
  }

  update(id: string, updatedWriter: Omit<Writer, 'id'>) {
    this.writers = this.writers.map((writer) => {
      if (writer.id === Number(id)) {
        return { ...writer, ...updatedWriter };
      }
      return writer;
    });

    return this.findOne(id);
  }

  delete(id: string) {
    const removedWriter = this.findOne(id);
    this.writers = this.writers.filter((writer) => writer.id !== Number(id));

    return removedWriter;
  }
}
