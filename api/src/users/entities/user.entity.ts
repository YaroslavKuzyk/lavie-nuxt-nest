import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Token } from '../../auth/entities/token.entity';
import { File } from '../../files/entities/files.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  type: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
