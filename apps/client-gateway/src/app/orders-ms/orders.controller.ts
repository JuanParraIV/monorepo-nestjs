import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from '../../common';
import { Constants } from '../../configs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(Constants.ORDERS_SERVICE) private readonly ordersClient: ClientProxy, // Inject the products service
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const response = await this.ordersClient.send('createOrder', {});
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error; // Rethrow the error to be handled by NestJS
    }
  }
  @Get()
  async findAll() {
    try {
      const response = await this.ordersClient.send('findAllOrders', {})
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error; // Rethrow the error to be handled by NestJS
  }
}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.ordersClient.send('findOneOrder', id);
      return response;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error; // Rethrow the error to be handled by NestJS
    }
  }
}
