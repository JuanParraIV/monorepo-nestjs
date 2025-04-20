import {
	Injectable,
	Logger,
	NotFoundException,
	OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "../../../generated/products-prisma";
import { PaginationDto } from "../../common";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
	private readonly logger = new Logger("ProductsService");

	onModuleInit() {
		this.$connect();
		this.logger.log("ProductService ready to use");
	}

	/**
	 * Creates a new product with the provided details.
	 *
	 * @param createProductDto - The data transfer object containing the product details.
	 * @returns The created product object.
	 * @throws Will throw an error if the product creation fails.
	 */
	async create(createProductDto: CreateProductDto) {
		const { name, description, price } = createProductDto;
		try {
			const product = await this.product.create({
				data: { name, description, price },
			});
			if (!product) {
				throw new NotFoundException("Product not created");
			}
			this.logger.log("Product created successfully");
			return product;
		} catch (error) {
			this.logger.error(`Failed to create product: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Retrieves a paginated list of products.
	 *
	 * @param paginationDto - An object containing pagination details:
	 *   - `current_page`: The current page number to retrieve.
	 *   - `limit`: The number of products to retrieve per page.
	 *
	 * @returns An object containing:
	 *   - `data`: An array of products for the current page.
	 *   - `meta`: Metadata about the pagination, including:
	 *     - `total_products`: The total number of products.
	 *     - `current_page`: The current page number.
	 *     - `total_pages`: The total number of pages.
	 *
	 * @throws NotFoundException - If the requested page exceeds the total number of pages.
	 * @throws Error - If an error occurs during the retrieval process.
	 */
	async findAll(paginationDto: PaginationDto) {
		const { current_page, limit } = paginationDto;

		const start = (current_page - 1) * limit;
		try {
			const totalProducts = await this.product.count({ where: { available: true } });
			const totalPages = Math.ceil(totalProducts / limit);
			const products = await this.product.findMany({
				skip: start,
				take: limit,
				orderBy: { createdAt: "desc" },
        where: { available: true },
			});
			if (current_page > totalPages) {
				throw new NotFoundException(
					`Page ${current_page} exceeds total pages ${totalPages}`,
				);
			}
			this.logger.log("Products retrieved successfully");
			return {
				data: products,
				meta: {
					total_products: totalProducts,
					current_page: current_page,
					total_pages: totalPages,
				},
			};
		} catch (error) {
			this.logger.error(`Failed to retrieve products: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Retrieves a single product by its unique identifier.
	 *
	 * @param id - The unique identifier of the product to retrieve.
	 * @returns A promise that resolves to the product if found.
	 * @throws {NotFoundException} If no product with the given ID is found.
	 * @throws {Error} If an error occurs during the retrieval process.
	 */
	async findOne(id: string) {
		try {
			const product = await this.product.findFirst({
				where: { id, available: true },
			});
			if (!product) {
				throw new NotFoundException(`Product with id ${id} not found`);
			}
			this.logger.log("Product by ID retrieved successfully");
			return product;
		} catch (error) {
			this.logger.error(`Failed to retrieve product: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Retrieves a single product by its name.
	 *
	 * @param name - The name of the product to retrieve.
	 * @returns A promise that resolves to the product if found.
	 * @throws {NotFoundException} If no product with the given name is found.
	 * @throws {Error} If an error occurs during the retrieval process.
	 */
	async findOneByName(name: string) {
		try {
			const product = await this.product.findFirst({
				where: { name, available: true },
			});
			if (!product) {
				throw new NotFoundException(`Product with name ${name} not found`);
			}
			this.logger.log("Product by name retrieved successfully");
			return product;
		} catch (error) {
			this.logger.error(`Failed to retrieve product: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Updates a product with the provided details.
	 *
	 * @param id - The unique identifier of the product to update.
	 * @param updateProductDto - The data transfer object containing the updated product details.
	 * @returns The updated product object.
	 * @throws NotFoundException - If no product with the given ID is found.
	 */
	async update(id: string, updateProductDto: UpdateProductDto) {
		const { name, description, price } = updateProductDto;
		try {
			const productToUpdate = this.findOne(id);

			if (!productToUpdate) {
				throw new NotFoundException(`Product with id ${id} not found`);
			}
			const updatedProduct = await this.product.update({
				where: { id, available: true },
				data: { name, description, price },
			});
			this.logger.log("Product updated successfully");
			return updatedProduct;
		} catch (error) {
			this.logger.error(`Failed to update product: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Removes a product from the list of products by its ID.
	 *
	 * @param id - The unique identifier of the product to be removed.
	 * @returns The removed product if it exists.
	 * @throws NotFoundException - If no product with the given ID is found.
	 */
	async remove(id: string) {
		try {
			const productToRemove = this.findOne(id);
			if (!productToRemove) {
				throw new NotFoundException(`Product with id ${id} not found`);
			}
			// Soft delete the product by setting available to false
			const updatedProduct = await this.product.update({
				where: { id },
				data: { available: false },
			});
			// Optionally, you can also delete the product from the database
			//const removedProduct = await this.product.delete({
			//  where: { id },
			// });
			this.logger.log("Product soft deleted successfully");
			return updatedProduct;
		} catch (error) {
			this.logger.error(`Failed to remove product: ${error.message}`);
			throw error;
		}
	}
}
