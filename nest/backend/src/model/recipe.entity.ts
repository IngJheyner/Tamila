/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import slugify from 'slugify';
import { Category, User } from './index';

@Entity('recipe')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  time: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string | null;

  @ManyToOne(() => Category, category => category.id, { cascade: true, nullable: false, eager: true })
  @JoinColumn({ name: 'category_id' })
  category_id: Category | number;

  // @Column({ type: 'int', default: 6 })
  // user_id: number;

  @ManyToOne(() => User, user => user.id, { cascade: true, nullable: false, eager: true })
  @JoinColumn({ name: 'user_id' })
  user_id: User | number;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, { lower: true });
  }
}
