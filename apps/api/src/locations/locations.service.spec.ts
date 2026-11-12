import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'CACHE_TTL_SECONDS') return '300';
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return fallback locations when MYMAPS_ID is not configured', async () => {
    const res = await service.getLocations();
    expect(res).toBeDefined();
    expect(res.source).toBe('file');
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0]).toHaveProperty('nama');
    expect(res.data[0]).toHaveProperty('jenis');
    expect(res.data[0]).toHaveProperty('lat');
    expect(res.data[0]).toHaveProperty('lng');
  });

  it('should filter locations by jenis', async () => {
    const res = await service.getLocations('TPS3R');
    expect(res.data.length).toBeGreaterThan(0);
    for (const item of res.data) {
      expect(item.jenis).toBe('TPS3R');
    }
  });

  it('should return empty list if jenis does not match', async () => {
    const res = await service.getLocations('JenisTidakDikenal');
    expect(res.data).toEqual([]);
  });
});
