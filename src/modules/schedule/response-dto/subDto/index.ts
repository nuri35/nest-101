import { Expose } from 'class-transformer';
import { CommonFields } from './common';

export class TeacherDto extends CommonFields {}

export class SubjectDto extends CommonFields {
  @Expose()
  hoursperweek: number;
}

export class ClassroomDto extends CommonFields {}
