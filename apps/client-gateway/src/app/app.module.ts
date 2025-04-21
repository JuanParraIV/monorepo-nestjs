import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Constants, envs } from '../configs';
import { ProductsController } from './products-ms/products.controller';
import { OrdersController } from './orders-ms/orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Constants.PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.TCPProductsMicroserviceHost,
          port: envs.TCPProductsMicroservicePort,
        },
      },
      {
        name: Constants.ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.TCPOrdersMicroserviceHost,
          port: envs.TCPOrdersMicroservicePort,
        },
      },
      //{ name: 'ANOTHER_SERVICE', url: 'http://localhost:4000' }
    ]),
  ],
  controllers: [ProductsController, OrdersController],
  providers: [],
})
export class AppModule {}
