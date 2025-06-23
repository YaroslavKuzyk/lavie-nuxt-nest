import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { File } from '../../files/entities/files.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pictureId: number;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => File, (file) => file.id)
  picture: File;
}
