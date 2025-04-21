import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';

/**
 * The root module of the Products application in the NestJS monorepo.
 *
 * This module imports the `ProductsModule` to provide the core functionality
 * of the Products application. It does not define any controllers or providers
 * at this level, as these are expected to be managed within the imported modules.
 *
 * @module AppModule
 */
@Module({
  imports: [OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
