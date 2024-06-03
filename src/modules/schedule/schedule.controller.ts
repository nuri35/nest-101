// lesson-plan.controller.ts
import { Controller, Get, Post, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Message } from 'src/decorators/response.message';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ScheduleResDto } from './response-dto/schedule.dto';
import { LookupSchedulesDto } from './dto/lookup.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('schedules')
@Serialize(ScheduleResDto)
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiCreatedResponse({
    description: 'The schedules have been successfully created.',
    type: [ScheduleResDto],
  })
  @Message('Schedules created successfully.')
  @Post()
  async create() {
    return await this.scheduleService.createSchedules();
  }

  @ApiOkResponse({
    description: 'Schedules fetched successfully.',
    type: [ScheduleResDto],
  })
  @Message('Schedules fetched successfully.')
  @Get()
  async lookup(@Query() dto: LookupSchedulesDto) {
    return await this.scheduleService.lookupSchedules(dto);
  }
}
