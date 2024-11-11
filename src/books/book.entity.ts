import { Borrow } from 'src/borrows/borrow.entity';
import { Writer } from 'src/writers/writer.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    default: 0,
    type: 'integer',
  })
  count: number;

  @ManyToOne(() => Writer, (writer) => writer.books)
  writer: Writer;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
