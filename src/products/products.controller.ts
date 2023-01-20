import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const genretedID = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: genretedID };
  }

  @Get()
  getAllProducts() {
    const products = this.productService.fetchProducts();
    return { products: products };
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return { product: this.productService.fetchOneProd(prodId) };
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const updatedProduct = this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { updatedProduct };
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productService.deleteProduct(prodId);
  }
}
