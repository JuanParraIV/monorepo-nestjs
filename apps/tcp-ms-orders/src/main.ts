/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app/app.module";
import { envs } from "./configs";

async function bootstrap() {
  const name = "TCP-Microservice-Orders";
	const logger = new Logger(name);
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.TCP,
			options: {
        host: envs.host,
				port: envs.port,
			},
		},
	);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	await app.listen();
	logger.log(
		`🚀 ${name} is running on: http://${envs.host}:${envs.port}`,
	);
}

bootstrap();
