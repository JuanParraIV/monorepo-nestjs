import { ConsoleLogger, Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from '../../common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({cmd: 'createProduct'})
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({cmd: 'findAllProducts'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern({cmd: 'findOneProduct'})
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({cmd: 'updateProduct'})
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({cmd: 'removeProduct'})
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    console.log(id)
    return this.productsService.remove(id);
  }
}
