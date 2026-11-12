import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'SCHEDULE_SOURCE') return 'file';
              if (key === 'CACHE_TTL_SECONDS') return '300';
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return fallback schedules when in file mode', async () => {
    const res = await service.getSchedules();
    expect(res).toBeDefined();
    expect(res.source).toBe('file');
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0]).toHaveProperty('kecamatan');
    expect(res.data[0]).toHaveProperty('wilayah');
    expect(res.data[0]).toHaveProperty('hari');
  });

  it('should filter schedules by kecamatan', async () => {
    const res = await service.getSchedules('Makale');
    expect(res.data.length).toBeGreaterThan(0);
    for (const item of res.data) {
      expect(item.kecamatan.toLowerCase()).toContain('makale');
    }
  });

  it('should return empty array if kecamatan filter does not match', async () => {
    const res = await service.getSchedules('KecamatanTidakAda12345');
    expect(res.data).toEqual([]);
  });
});
