import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
}

/**
 * Sets up Swagger UI for the given NestJS application.
 *
 * @param app - The NestJS application instance.
 * @param options - Optional partial configuration for Swagger, including title, description, and version.
 * @param path - The URL path where the Swagger UI will be hosted. Defaults to 'api/v1/docs'.
 *
 * This function initializes Swagger documentation for the application using the provided configuration
 * and merges it with default values. It then creates a Swagger document and sets up the Swagger UI
 * at the specified path.
 */
export const setupSwagger = (
  app: INestApplication,
  options?: Partial<SwaggerConfig>,
  path = 'api/v1/docs'
): void => {
  const defaultConfig: SwaggerConfig = {
    title: 'API',
    description: 'API documentation',
    version: '1.0',
  };
  const config = { ...defaultConfig, ...options };

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(config.title)
      .setDescription(config.description)
      .setVersion(config.version)
      .build()
  );

  SwaggerModule.setup(path, app, document);
};
