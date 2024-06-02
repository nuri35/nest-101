import { Classroom } from 'src/entities/classroom.entity';
import { Subject } from 'src/entities/subject.entity';
import { Teacher } from 'src/entities/teacher.entity';

export interface AlgorithmParams {
  classrooms: Classroom[];
  teachers: Teacher[];
  subjects: Subject[];
}

export interface ScheduleEntry {
  classroom: Classroom;
  subject: Subject;
  day: string;
  hour: number;
  teacher: Teacher;
}
