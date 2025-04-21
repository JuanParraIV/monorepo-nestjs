import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
	@IsPositive()
	@IsOptional()
  @Min(0)
	@Type(() => Number)
	current_page?: number = 1;

	@IsPositive()
	@IsOptional()
	@Type(() => Number)
	limit?: number = 5;

}
