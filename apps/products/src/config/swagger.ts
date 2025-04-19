import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
}

// how to l
function setupSwagger(app: INestApplication): void {
  const config: SwaggerConfig = {
    title: "Products API",
    description: "API documentation for the REPASO service",
    version: "1.0",
  };

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .build());

  SwaggerModule.setup("api/v1/docs", app, document);
}

  export default setupSwagger;
