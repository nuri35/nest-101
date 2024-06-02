// lesson-plan.controller.ts
import { Controller, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Message } from 'src/decorators/response.message';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ScheduleResDto } from './response-dto/schedule.dto';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Message('Schedules created successfully.')
  @Post()
  @Serialize(ScheduleResDto)
  async create() {
    return await this.scheduleService.createSchedules();
  }
}
