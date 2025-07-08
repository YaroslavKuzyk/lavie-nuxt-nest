import { Category } from '../../categories/entities/category.entity';
import {
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { ProductAttribute } from './productAttributes.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  discount: number | null;

  @Column()
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => ProductAttribute, (attr) => attr.product, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  attributes: ProductAttribute[];
}
