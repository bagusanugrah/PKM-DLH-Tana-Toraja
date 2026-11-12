import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Papa from 'papaparse';
import { PengumumanItem, AnnouncementsResponse } from './announcements.interface';

@Injectable()
export class AnnouncementsService {
  private readonly logger = new Logger(AnnouncementsService.name);
  private cachedAnnouncements: PengumumanItem[] = [];
  private cacheExpiresAt = 0;

  constructor(private readonly configService: ConfigService) {}

  async getAnnouncements(): Promise<AnnouncementsResponse> {
    const enabled = this.configService.get<string>('ENABLE_ANNOUNCEMENTS') === 'true';
    if (!enabled) {
      return { data: [], enabled: false };
    }

    const now = Date.now();
    const ttlSeconds = parseInt(this.configService.get<string>('CACHE_TTL_SECONDS') || '300', 10);
    const ttlMs = ttlSeconds * 1000;

    if (this.cachedAnnouncements.length > 0 && now < this.cacheExpiresAt) {
      return { data: this.cachedAnnouncements, enabled: true };
    }

    const csvUrl = this.configService.get<string>('SHEETS_ANNOUNCEMENTS_CSV_URL');
    if (!csvUrl) {
      return { data: [], enabled: true };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(csvUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }

      const csvText = await res.text();
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toLowerCase(),
      });

      const items: PengumumanItem[] = [];
      for (const row of parsed.data as any[]) {
        const tampilkan = (row.tampilkan || '').trim().toUpperCase();
        if (tampilkan === 'YA' || tampilkan === 'TRUE' || tampilkan === '1') {
          items.push({
            tanggal: (row.tanggal || '').trim(),
            judul: (row.judul || '').trim(),
            isi: (row.isi || '').trim(),
          });
        }
      }

      // Sort newest date first, take top 3
      items.sort((a, b) => (b.tanggal > a.tanggal ? 1 : -1));
      this.cachedAnnouncements = items.slice(0, 3);
      this.cacheExpiresAt = now + ttlMs;

      return { data: this.cachedAnnouncements, enabled: true };
    } catch (err) {
      this.logger.warn(`Gagal membaca pengumuman dari sheets: ${err.message}`);
      return { data: this.cachedAnnouncements, enabled: true };
    }
  }
}
