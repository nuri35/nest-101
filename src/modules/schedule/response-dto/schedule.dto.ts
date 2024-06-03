import { Type, Expose } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ClassroomDto, SubjectDto, TeacherDto } from './subDto';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleResDto {
  @ApiProperty({
    description: 'The id of the classroom',
    type: Number,
  })
  @ValidateNested()
  @Type(() => ClassroomDto)
  @Expose()
  classroom: ClassroomDto;

  @ApiProperty({
    description: 'The id of the subject',
    type: Number,
  })
  @ValidateNested()
  @Type(() => SubjectDto)
  @Expose()
  subject: SubjectDto;

  @ApiProperty({
    description: 'The day of the week',
    type: String,
  })
  @Expose()
  day: string;

  @ApiProperty({
    description: 'The hour of the day',
    type: Number,
  })
  @Expose()
  hour: number;

  @ApiProperty({
    description: 'The id of the teacher',
    type: Number,
  })
  @ValidateNested()
  @Type(() => TeacherDto)
  @Expose()
  teacher: TeacherDto;

  @ApiProperty({
    description: 'The id of the schedule',
    type: Number,
  })
  @Expose({
    name: 'id',
  })
  publicId: number;
}
