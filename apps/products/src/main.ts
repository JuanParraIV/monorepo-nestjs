/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { envs, setupSwagger } from './configs';


async function bootstrap() {
  const logger = new Logger('Main');
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
  setupSwagger(app, {
  title: 'Products API',
  description: 'API documentation for Products microservice',
  version: '1.0.0',
}, `${globalPrefix}/docs`);
  await app.listen(envs.port);
  logger.log(
    `🚀 Application is running on: http://localhost:${envs.port}/${globalPrefix}`
  );
  logger.log(
    `📖 Swagger is running on: http://localhost:${envs.port}/${globalPrefix}/docs`
  );
}

bootstrap();
