import { Body, Controller, Delete, Get, Inject, Logger, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto, PaginationDto, UpdateProductDto } from '../../common';
import { Constants } from '../../configs';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(Constants.PRODUCTS_SERVICE) private readonly productsClient: ClientProxy, // Inject the products service
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await firstValueFrom(this.productsClient.send({ cmd: 'createProduct' }, createProductDto));
      Logger.log('Creating a new product');
      return product
    } catch (error) {
      Logger.error(`Failed to create product: ${error.message}`);
      throw new RpcException(error);

    }
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto){
    try {
      const products = await firstValueFrom(this.productsClient.send({ cmd: 'findAllProducts' }, pagination));
      Logger.log('Fetching all products with pagination');
      return products
    } catch (error) {
      Logger.error(`Failed to fetch products: ${error.message}`);
      throw new RpcException(error);
    }

  }

  @Get(':id') // ParseUUIDPipe
  async findOne(@Param('id', ParseUUIDPipe) id: string){
    try {
      const product = await firstValueFrom(this.productsClient.send({ cmd: 'findOneProduct' }, { id }));
      Logger.log(`Fetching product with ID: ${id}`);
      return product
    } catch (error) {
      Logger.error(`Failed to fetch product: ${error.message}`);
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const product = await firstValueFrom(this.productsClient.send({ cmd: 'updateProduct' }, { id, ...updateProductDto }));
      Logger.log(`Updating product with ID: ${id}`);
      return product
    } catch (error) {
      Logger.error(`Failed to update product: ${error.message}`);
      throw new RpcException(error);

    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string){
    //try {
    //  const product = await firstValueFrom(this.productsClient.send({ cmd: 'removeProduct' }, { id }));
    //  Logger.log(`Removing product with ID: ${id}`);
    //  return product
    //} catch (error) {
    //  Logger.error(`Failed to remove product: ${error.message}`);
    //  throw new RpcException(error);
    //}

    return this.productsClient.send({ cmd: 'removeProduct' }, { id }).pipe(
      catchError( err => {
        throw new RpcException(err);
      })
    )
  }
}
