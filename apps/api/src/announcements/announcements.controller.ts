import { Controller, Get } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsResponse } from './announcements.interface';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  async getAnnouncements(): Promise<AnnouncementsResponse> {
    return this.announcementsService.getAnnouncements();
  }
}
