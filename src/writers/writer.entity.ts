import { Book } from 'src/books/book.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('writers')
export class Writer extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'text',
  })
  firstName: string;

  @Column({
    type: 'text',
  })
  secondName: string;

  @OneToMany(() => Book, (book) => book.id)
  books: Book[];
}
