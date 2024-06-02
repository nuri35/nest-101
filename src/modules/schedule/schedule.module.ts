import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { Classroom } from 'src/entities/classroom.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Subject } from 'src/entities/subject.entity';
import { ScheduleCreator } from 'src/inheritance/bestSchedule';
import { ScheduleRepository } from 'src/repository/schedule.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Classroom, Teacher, Subject])],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    {
      provide: 'ScheduleCreator',
      useClass: ScheduleCreator,
    },
    ScheduleRepository,
  ],
})
export class ScheduleModule {}
