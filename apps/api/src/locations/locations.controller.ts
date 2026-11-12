import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResponse } from './locations.interface';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async getLocations(@Query('jenis') jenis?: string): Promise<LocationsResponse> {
    return this.locationsService.getLocations(jenis);
  }
}
