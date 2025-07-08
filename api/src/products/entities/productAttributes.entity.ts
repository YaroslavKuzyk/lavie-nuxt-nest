import {
  Column,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from './product.entity';
import { Color } from '../../colors/entities/colors.entity';
import { Size } from '../../sizes/entities/sizes.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => Product, (product) => product.attributes, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  product: Product;

  @ManyToMany(() => Color, { eager: true })
  @JoinTable()
  colors: Color[];

  @ManyToMany(() => Size, { eager: true })
  @JoinTable()
  sizes: Size[];
}
