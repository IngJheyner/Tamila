/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  message: string;
}