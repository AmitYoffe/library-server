import { BorrowEntity } from 'src/borrows';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(["username"])
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
