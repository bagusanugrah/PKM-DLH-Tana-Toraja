import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as Papa from 'papaparse';
import { JadwalItem, SchedulesResponse } from './schedules.interface';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger(SchedulesService.name);
  private cachedResponse: SchedulesResponse | null = null;
  private cacheExpiresAt = 0;

  constructor(private readonly configService: ConfigService) {}

  private getFallbackData(): JadwalItem[] {
    const candidates = [
      path.resolve(__dirname, '../fallback/jadwal.fallback.json'),
      path.resolve(process.cwd(), 'src/fallback/jadwal.fallback.json'),
      path.resolve(process.cwd(), '../web/content/jadwal.fallback.json'),
    ];

    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        try {
          const raw = fs.readFileSync(filePath, 'utf-8');
          return JSON.parse(raw) as JadwalItem[];
        } catch (err) {
          this.logger.error(`Gagal membaca file fallback ${filePath}: ${err}`);
        }
      }
    }

    return [];
  }

  private parseCsv(csvText: string): JadwalItem[] {
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, '_'),
    });

    const items: JadwalItem[] = [];

    for (const row of parsed.data as any[]) {
      const kecamatan = (row.kecamatan || '').trim();
      const wilayah = (row.wilayah || row.kelurahan || row.lembang || '').trim();
      const hari = (row.hari || '').trim();
      const jam = (row.jam || '').trim();
      const titikKumpul = (row.titik_kumpul || row.titikkumpul || '').trim();

      if (kecamatan && hari) {
        items.push({
          kecamatan,
          wilayah: wilayah || '-',
          hari,
          jam: jam || '-',
          titikKumpul: titikKumpul || '-',
        });
      }
    }

    return items;
  }

  async getSchedules(kecamatanFilter?: string): Promise<SchedulesResponse> {
    const now = Date.now();
    const source = (this.configService.get<string>('SCHEDULE_SOURCE') || 'file').toLowerCase();
    const ttlSeconds = parseInt(this.configService.get<string>('CACHE_TTL_SECONDS') || '300', 10);
    const ttlMs = ttlSeconds * 1000;

    // Check memory cache
    if (this.cachedResponse && now < this.cacheExpiresAt) {
      return this.filterResponse(this.cachedResponse, kecamatanFilter);
    }

    if (source === 'sheets') {
      const csvUrl = this.configService.get<string>('SHEETS_SCHEDULE_CSV_URL');
      if (csvUrl) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          const res = await fetch(csvUrl, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (!res.ok) {
            throw new Error(`Google Sheets CSV HTTP status: ${res.status}`);
          }

          const csvText = await res.text();
          const parsed = this.parseCsv(csvText);

          if (parsed.length > 0) {
            this.cachedResponse = {
              data: parsed,
              source: 'sheets',
              updatedAt: new Date().toISOString(),
              stale: false,
            };
            this.cacheExpiresAt = now + ttlMs;
            return this.filterResponse(this.cachedResponse, kecamatanFilter);
          }
        } catch (error) {
          this.logger.warn(`Gagal mengambil jadwal dari Google Sheets (${error.message}). Menggunakan cache/fallback.`);
          if (this.cachedResponse) {
            return this.filterResponse(
              {
                ...this.cachedResponse,
                stale: true,
              },
              kecamatanFilter,
            );
          }
        }
      }
    }

    // Fallback mode (file)
    const fallbackItems = this.getFallbackData();
    this.cachedResponse = {
      data: fallbackItems,
      source: 'file',
      updatedAt: new Date().toISOString(),
      stale: false,
    };
    this.cacheExpiresAt = now + ttlMs;

    return this.filterResponse(this.cachedResponse, kecamatanFilter);
  }

  private filterResponse(response: SchedulesResponse, kecamatanFilter?: string): SchedulesResponse {
    if (!kecamatanFilter) {
      return response;
    }

    const filterLower = kecamatanFilter.toLowerCase().trim();
    const filtered = response.data.filter((item) =>
      item.kecamatan.toLowerCase().includes(filterLower) ||
      item.wilayah.toLowerCase().includes(filterLower),
    );

    return {
      ...response,
      data: filtered,
    };
  }
}
