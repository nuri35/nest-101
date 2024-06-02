// src/entity/classroom.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Level } from './level.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Örneğin, "A" veya "B"

  @ManyToOne(() => Level, (level) => level.classrooms)
  @JoinColumn({ name: 'levelid' })
  level: Level;

  @OneToMany(() => Schedule, (schedule) => schedule.classroom)
  schedules: Schedule[];
}
