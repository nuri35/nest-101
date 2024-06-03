import { Injectable } from '@nestjs/common';
import { Schedule } from 'src/entities/schedule.entity';
import { DataSource, Repository } from 'typeorm';
import { ScheduleEntry } from 'src/interfaces/algorithm';
import { LookupSchedulesDto } from 'src/modules/schedule/dto/lookup.dto';

@Injectable()
export class ScheduleRepository extends Repository<Schedule> {
  constructor(private dataSource: DataSource) {
    super(Schedule, dataSource.createEntityManager());
  }

  async customCreate(schedule: ScheduleEntry[]) {
    const scheduleEntries = schedule.map((entry) => {
      const scheduleEntry = new Schedule();
      scheduleEntry.classroom = entry.classroom;
      scheduleEntry.subject = entry.subject;
      scheduleEntry.day = entry.day || 'Monday';
      scheduleEntry.hour = entry.hour || 1;
      scheduleEntry.teacher = entry.teacher;
      return scheduleEntry;
    });
    return await this.save(scheduleEntries);
  }

  async lookup(queryDto: LookupSchedulesDto) {
    const { page, limit } = queryDto;
    return await this.find({
      relations: {
        teacher: true,
        subject: true,
        classroom: true,
      },
      where: {},
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
