// subject.entity.ts Subject (Ders) Entity
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from 'src/entities/schedule.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hoursperweek: number;

  @OneToMany(() => Schedule, (schedule) => schedule.subject)
  schedules: Schedule[];
}
