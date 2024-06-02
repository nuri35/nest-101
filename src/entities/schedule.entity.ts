// src/entity/schedule.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Classroom } from './classroom.entity';
import { Teacher } from './teacher.entity';
import { Subject } from './subject.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Classroom, (classroom) => classroom.schedules)
  @JoinColumn({ name: 'classroomid' })
  classroom: Classroom;

  @ManyToOne(() => Teacher, (teacher) => teacher.schedules)
  @JoinColumn({ name: 'teacherid' })
  teacher: Teacher;

  @ManyToOne(() => Subject, (subject) => subject.schedules)
  @JoinColumn({ name: 'subjectid' })
  subject: Subject;

  @Column()
  day: string;

  @Column()
  hour: number;
}
