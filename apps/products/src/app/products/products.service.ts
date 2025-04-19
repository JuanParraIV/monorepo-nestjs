import {
	Injectable,
	Logger,
	NotFoundException,
	OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "../../../generated/products-prisma";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
	private readonly logger = new Logger("ProductsService");

	onModuleInit() {
		this.$connect();
		this.logger.log("ProductService ready to use");
	}

	private products: Product[] = [];

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
			this.logger.log("Product created successfully");
			return product;
		} catch (error) {
			this.logger.error(`Failed to create product: ${error.message}`);
		}
	}

	/**
	 * Retrieves a paginated list of products based on the provided page ID and page size.
	 *
	 * @param page_id - The current page number (1-based index).
	 * @param page_size - The number of products to include in each page.
	 * @returns An array of products for the specified page.
	 * @throws {NotFoundException} If no products are found for the given page and size.
	 */
	async findAll(page_id: number, page_size: number) {
		const start = (page_id - 1) * page_size;
		try {
			const products = await this.product.findMany({
				skip: start,
				take: page_size,
				// orderBy: { createdAt: 'desc' }, // opcional
			});
			this.logger.log("Products retrieved successfully");
			return products;
		} catch (error) {
			this.logger.error(`Failed to retrieve products: ${error.message}`);
		}
	}

	/**
	 * Retrieves a single product by its unique identifier.
	 *
	 * @param id - The unique identifier of the product to retrieve.
	 * @returns The product that matches the given identifier.
	 * @throws NotFoundException - If no product with the specified identifier is found.
	 */
	findOne(id: string) {
		try {
			const product = this.product.findFirst({
				where: { id },
			});
			if (!product) {
				throw new NotFoundException(`Product with id ${id} not found`);
			}
			this.logger.log("Product by ID retrieved successfully");
			return product;
		} catch (error) {
			this.logger.error(`Failed to retrieve product: ${error.message}`);
		}
	}

	/**
	 * Finds a product by its name.
	 *
	 * @param name - The name of the product to search for.
	 * @returns The product that matches the given name.
	 * @throws {NotFoundException} If no product with the specified name is found.
	 */
	findOneByName(name: string) {
		const product = this.products.find((product) => product.name === name);
		if (!product) {
			this.logger.error(`Product with name ${name} not found`);
		}
		return product;
	}

	/**
	 * Updates an existing product with the provided data.
	 *
	 * @param id - The unique identifier of the product to update.
	 * @param updateProductDto - An object containing the updated product details.
	 * @throws {NotFoundException} If a product with the specified ID is not found.
	 * @returns The updated product.
	 */
	async update(id: string, updateProductDto: UpdateProductDto) {
		const productToUpdate = this.findOne(id);
		const { name, description, price } = updateProductDto;
		try {
			const updatedProduct = await this.product.update({
				where: { id },
				data: { name, description, price },
			});
			this.logger.log("Product updated successfully");
			return updatedProduct;
		} catch (error) {
			this.logger.error(`Failed to update product: ${error.message}`);
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
		const productToRemove = this.findOne(id);
		try {
			const removedProduct = await this.product.delete({
				where: { id },
			});
			this.logger.log("Product removed successfully");
			return removedProduct;
		} catch (error) {
			this.logger.error(`Failed to remove product: ${error.message}`);
		}
	}
}
