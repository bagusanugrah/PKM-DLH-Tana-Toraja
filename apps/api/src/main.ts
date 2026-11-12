import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security headers with helmet
  app.use(helmet());

  // Global prefix for all API endpoints: /api
  app.setGlobalPrefix('api');

  // CORS configuration
  const corsOrigin = configService.get<string>('CORS_ORIGIN') || 'http://localhost:3000';
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    methods: 'GET,HEAD',
    credentials: true,
  });

  const port = parseInt(configService.get<string>('PORT') || '3001', 10);
  await app.listen(port);
  console.log(`🚀 NestJS Backend DLH Tana Toraja berjalan di port ${port}`);
}

bootstrap();
