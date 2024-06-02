import { Type, Expose } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ClassroomDto, SubjectDto, TeacherDto } from './subDto';

export class ScheduleResDto {
  @ValidateNested()
  @Type(() => ClassroomDto)
  @Expose()
  classroom: ClassroomDto;

  @ValidateNested()
  @Type(() => SubjectDto)
  @Expose()
  subject: SubjectDto;

  @Expose()
  day: string;

  @Expose()
  hour: number;

  @ValidateNested()
  @Type(() => TeacherDto)
  @Expose()
  teacher: TeacherDto;

  @Expose({
    name: 'id',
  })
  publicId: number;
}
