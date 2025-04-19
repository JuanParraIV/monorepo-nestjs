/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { envs } from './config/env';
import setupSwagger from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  setupSwagger(app);
  await app.listen(envs.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${envs.port}/${globalPrefix}`
  );
  Logger.log(
    `📖 Swagger is running on: http://localhost:${envs.port}/${globalPrefix}/docs`
  );
}

bootstrap();
