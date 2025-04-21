/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./state.entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  token: string;

  @Column({ type: 'int', default: 2 })
  state_id: number;

  @ManyToOne(() => State, state => state.id, { cascade: true, nullable: false, eager: true })
  @JoinColumn({ name: 'state_id' })
  state: State;

}