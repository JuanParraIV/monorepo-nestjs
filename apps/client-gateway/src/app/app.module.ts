import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Constants, envs } from "../configs";
import { ProductsController } from "./products-ms/products.controller";

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
			//{ name: 'ANOTHER_SERVICE', url: 'http://localhost:4000' }
		]),
	],
	controllers: [ProductsController],
	providers: [],
})
export class AppModule {}
