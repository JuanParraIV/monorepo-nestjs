import { PartialType } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
	@IsUUID("all", { message: "id must be a valid UUID" })
	@IsString()
	id: string;
}
