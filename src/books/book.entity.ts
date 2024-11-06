import { Writer } from 'src/writers/writer.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'text',
  })
  title: string;

  @ManyToOne(() => Writer, (writer) => writer.id)
  writer: Writer;

  @Column({
    type: 'integer',
  })
  count: number;
}
