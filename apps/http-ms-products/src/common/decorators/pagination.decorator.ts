// common/decorators/pagination.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { PaginationDto } from "../../../../tcp-ms/src/common/dto/pagination.dto";

export const Pagination = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): PaginationDto => {
		const request = ctx.switchToHttp().getRequest();
		const query = request.query;

		const pagination = plainToInstance(PaginationDto, query, {
			enableImplicitConversion: true,
		});

		const errors = validateSync(pagination, {
			whitelist: true,
			forbidNonWhitelisted: true,
		});

		if (errors.length > 0) {
			throw new Error(`Invalid pagination query: ${JSON.stringify(errors)}`);
		}

		return pagination;
	},
);
