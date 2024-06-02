// src/entity/level.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Classroom } from './classroom.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Örneğin, "11" veya "12"

  @OneToMany(() => Classroom, (classroom) => classroom.level)
  classrooms: Classroom[];
}
