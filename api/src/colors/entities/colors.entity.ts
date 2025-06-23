import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
