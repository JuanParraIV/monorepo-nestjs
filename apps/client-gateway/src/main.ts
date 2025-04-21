/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { envs, setupSwagger } from "./configs";
import { RpcCustomExceptionFilter } from "./common";

async function bootstrap() {
  const name = "Gateway Microservice"
	const globalPrefix = "api/v1";
	const logger = new Logger(`Main-${name}`);
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
  app.useGlobalFilters(new RpcCustomExceptionFilter());
	setupSwagger(
		app,
		{
			title: `${name}`,
			description: `API documentation for ${name}`,
			version: "1.0.0",
		},
		`${globalPrefix}/docs`,
	);
	await app.listen(envs.port);
	logger.log(
		`🚀 ${name} is running on: http://localhost:${envs.port}/${globalPrefix}`,
	);
	logger.log(
		`📖 Swagger docs is running on: http://localhost:${envs.port}/${globalPrefix}/docs`,
	);
}

bootstrap();
