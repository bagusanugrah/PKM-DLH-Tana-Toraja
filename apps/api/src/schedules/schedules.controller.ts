import { Controller, Get, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesResponse } from './schedules.interface';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  async getSchedules(@Query('kecamatan') kecamatan?: string): Promise<SchedulesResponse> {
    return this.schedulesService.getSchedules(kecamatan);
  }
}
