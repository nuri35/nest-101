// lesson-plan.controller.ts
import { Controller, Get, Post, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Message } from 'src/decorators/response.message';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ScheduleResDto } from './response-dto/schedule.dto';
import { LookupSchedulesDto } from './dto/lookup.dto';

@Controller('schedules')
@Serialize(ScheduleResDto)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Message('Schedules created successfully.')
  @Post()
  async create() {
    return await this.scheduleService.createSchedules();
  }

  @Message('Schedules fetched successfully.')
  @Get()
  async lookup(@Query() dto: LookupSchedulesDto) {
    return await this.scheduleService.lookupSchedules(dto);
  }
}
