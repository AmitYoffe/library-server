import { BookEntity } from 'src/books/book.entity';
import { UserEntity } from 'src/users';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('borrows')
export class BorrowEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id!: number;

  @Column({
    type: 'integer',
  })
  userId!: number;

  @Column({
    type: 'integer',
  })
  bookId!: number;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  returnedAt!: Date | null;

  @ManyToOne(() => BookEntity, (book) => book.borrows, { onDelete: 'CASCADE' })
  book!: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.borrows, { onDelete: 'CASCADE' })
  user!: UserEntity;
}
