/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import slugify from "slugify";

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, { lower: true });
  }
}
