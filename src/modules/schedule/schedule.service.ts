// lesson-plan.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/entities/classroom.entity';
import { Subject } from 'src/entities/subject.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Repository } from 'typeorm';
import { ScheduleCreator } from 'src/inheritance/bestSchedule';
import { ScheduleRepository } from 'src/repository/schedule.repo';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @Inject('ScheduleCreator')
    private readonly scheduleCreator: ScheduleCreator,
    @InjectRepository(ScheduleRepository)
    private readonly scheduleRepo: ScheduleRepository,
  ) {}
  async createSchedules() {
    const classrooms = await this.classroomRepository.find();
    const teachers = await this.teacherRepository.find();
    const subjects = await this.subjectRepository.find();

    // resuable code
    const bestScheduled = await this.scheduleCreator.build({
      classrooms,
      teachers,
      subjects,
    });

    return await this.scheduleRepo.customCreate(bestScheduled);
  }
}

// sımdı get endpointini yapalım..
