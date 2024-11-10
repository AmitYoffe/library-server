import { Book } from 'src/books/book.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('borrows')
export class Borrow extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'integer',
    })
    id: number;

    @Column({
        type: 'integer',
    })
    userId: number;

    @ManyToOne(() => Book, (book) => book.id, { onDelete: 'CASCADE' })
    book: Book;
}
