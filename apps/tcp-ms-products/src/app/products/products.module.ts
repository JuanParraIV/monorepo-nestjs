import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

/**
 * The `ProductsModule` is a NestJS module that encapsulates the functionality
 * related to managing products within the application. It defines the
 * controllers and providers required for handling product-related operations.
 *
 * @module ProductsModule
 * @description This module includes the `ProductsController` for handling HTTP
 * requests and the `ProductsService` for implementing the business logic.
 */
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
