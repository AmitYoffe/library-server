import Writer from 'src/writers/model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'varchar', // not sure 
  })
  writer: Writer;

  @Column({
    type: 'integer',
  })
  count: number;
}
