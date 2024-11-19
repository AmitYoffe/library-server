import { BorrowEntity } from 'src/borrows/borrow.entity';
import { WriterEntity } from 'src/writers/writer.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class BookEntity extends BaseEntity {
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

  @ManyToOne(() => WriterEntity, (writer) => writer.books)
  writer: WriterEntity;

  @OneToMany(() => BorrowEntity, (borrow) => borrow.book)
  borrows: BorrowEntity[];
}
