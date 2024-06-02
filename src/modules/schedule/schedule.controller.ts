// lesson-plan.controller.ts
import { Controller, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('nestjs')
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiOperation({ summary: 'Create schedules' })
  @ApiResponse({ status: 201, description: 'Schedules created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  async create() {
    return await this.scheduleService.createSchedules();
  }
}
