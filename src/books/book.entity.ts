import { Writer } from 'src/writers/writer.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    unique: true,
    type: 'text',
  })
  title: string;

  @ManyToOne(() => Writer, (writer) => writer.books)
  writer: Writer;

  @Column({
    default: 0,
    type: 'integer',
  })
  count: number;
}
