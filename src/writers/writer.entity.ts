import Book from 'src/books/model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'integer', // type should be array?
  })
  books: Book[];
}
