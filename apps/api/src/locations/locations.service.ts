import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { XMLParser } from 'fast-xml-parser';
import { JenisLokasi, LokasiItem, LocationsResponse } from './locations.interface';

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name);
  private cachedResponse: LocationsResponse | null = null;
  private cacheExpiresAt = 0;

  constructor(private readonly configService: ConfigService) {}

  private getFallbackData(): LokasiItem[] {
    const candidates = [
      path.resolve(__dirname, '../fallback/lokasi.fallback.json'),
      path.resolve(process.cwd(), 'src/fallback/lokasi.fallback.json'),
      path.resolve(process.cwd(), '../web/content/lokasi.fallback.json'),
    ];

    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        try {
          const raw = fs.readFileSync(filePath, 'utf-8');
          return JSON.parse(raw) as LokasiItem[];
        } catch (err) {
          this.logger.error(`Gagal membaca file fallback lokasi ${filePath}: ${err}`);
        }
      }
    }

    return [];
  }

  private parseKml(kmlText: string): LokasiItem[] {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      trimValues: true,
    });

    const parsed = parser.parse(kmlText);
    const document = parsed?.kml?.Document;
    if (!document) {
      return [];
    }

    const folders = Array.isArray(document.Folder) ? document.Folder : document.Folder ? [document.Folder] : [];
    const items: LokasiItem[] = [];

    for (const folder of folders) {
      const folderName = (folder.name || '').trim();
      let jenis: JenisLokasi = 'TPS';
      if (/tps3r/i.test(folderName)) {
        jenis = 'TPS3R';
      } else if (/bank\s*sampah/i.test(folderName)) {
        jenis = 'Bank Sampah';
      } else if (/tps/i.test(folderName)) {
        jenis = 'TPS';
      } else {
        // Skip layers like Kantor DLH or unclassified
        if (/kantor/i.test(folderName)) {
          continue;
        }
      }

      const placemarks = Array.isArray(folder.Placemark)
        ? folder.Placemark
        : folder.Placemark
          ? [folder.Placemark]
          : [];

      for (const pm of placemarks) {
        const nama = (pm.name || '').trim();
        if (!nama) continue;

        let rawDesc = (pm.description || '').toString();
        // Replace HTML breaks with newlines
        rawDesc = rawDesc.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?[^>]+(>|$)/g, '');

        let alamat = '';
        let jamBuka = '';

        const lines = rawDesc.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (/^alamat\s*:/i.test(trimmed)) {
            alamat = trimmed.replace(/^alamat\s*:/i, '').trim();
          } else if (/^jam\s*buka\s*:/i.test(trimmed)) {
            jamBuka = trimmed.replace(/^jam\s*buka\s*:/i, '').trim();
          }
        }

        if (!alamat && lines.length > 0) {
          alamat = lines[0].trim();
        }
        if (!jamBuka && lines.length > 1) {
          jamBuka = lines[1].trim();
        }

        // Coordinates in KML Point: "lng,lat,alt"
        const coordStr = pm.Point?.coordinates || '';
        const parts = coordStr.split(',');
        if (parts.length >= 2) {
          const lng = parseFloat(parts[0]);
          const lat = parseFloat(parts[1]);

          if (!isNaN(lat) && !isNaN(lng)) {
            items.push({
              nama,
              jenis,
              alamat: alamat || 'Kabupaten Tana Toraja',
              jamBuka: jamBuka || '06.00–18.00 WITA',
              lat,
              lng,
            });
          }
        }
      }
    }

    return items;
  }

  async getLocations(jenisFilter?: string): Promise<LocationsResponse> {
    const now = Date.now();
    const myMapsId = this.configService.get<string>('MYMAPS_ID');
    const ttlSeconds = parseInt(this.configService.get<string>('CACHE_TTL_SECONDS') || '300', 10);
    const ttlMs = ttlSeconds * 1000;

    // Check memory cache
    if (this.cachedResponse && now < this.cacheExpiresAt) {
      return this.filterResponse(this.cachedResponse, jenisFilter);
    }

    if (myMapsId && myMapsId !== '1A2B3C4D5E') {
      const kmlUrl = `https://www.google.com/maps/d/kml?mid=${myMapsId}&forcekml=1`;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(kmlUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`Google My Maps KML HTTP status: ${res.status}`);
        }

        const kmlText = await res.text();
        const parsed = this.parseKml(kmlText);

        if (parsed.length > 0) {
          this.cachedResponse = {
            data: parsed,
            source: 'mymaps',
            updatedAt: new Date().toISOString(),
            stale: false,
          };
          this.cacheExpiresAt = now + ttlMs;
          return this.filterResponse(this.cachedResponse, jenisFilter);
        }
      } catch (error) {
        this.logger.warn(`Gagal mengambil KML dari My Maps (${error.message}). Menggunakan cache/fallback.`);
        if (this.cachedResponse) {
          return this.filterResponse(
            {
              ...this.cachedResponse,
              stale: true,
            },
            jenisFilter,
          );
        }
      }
    }

    // Fallback mode
    const fallbackItems = this.getFallbackData();
    this.cachedResponse = {
      data: fallbackItems,
      source: 'file',
      updatedAt: new Date().toISOString(),
      stale: false,
    };
    this.cacheExpiresAt = now + ttlMs;

    return this.filterResponse(this.cachedResponse, jenisFilter);
  }

  private filterResponse(response: LocationsResponse, jenisFilter?: string): LocationsResponse {
    if (!jenisFilter) {
      return response;
    }

    const filterLower = jenisFilter.toLowerCase().trim();
    const filtered = response.data.filter((item) => item.jenis.toLowerCase() === filterLower);

    return {
      ...response,
      data: filtered,
    };
  }
}
