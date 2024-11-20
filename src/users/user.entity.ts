import { BorrowEntity } from 'src/borrows/borrow.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'text',
  })
  username: string;

  @Column({
    type: 'boolean',
  })
  isAdmin: boolean;

  @Column({
    type: 'text',
  })
  password: string;

  @OneToMany(() => BorrowEntity, (borrow) => borrow.user)
  borrows: BorrowEntity[];
}
