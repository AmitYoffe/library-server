import { Book, User } from 'src';
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

    @ManyToOne(() => Book, (book) => book.borrows, { onDelete: 'CASCADE' })
    book: Book;

    @ManyToOne(() => User, (user) => user.borrows, { onDelete: 'CASCADE' })
    user: User;
}
