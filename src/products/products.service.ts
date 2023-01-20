import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = new Date().toISOString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  fetchProducts() {
    return this.products;
  }

  fetchOneProd(productId: string) {
    const product = this.products.find((data) => data.id === productId);
    if (!product) {
      throw new NotFoundException('Data not found');
    }
    return product;
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const productIndex = this.products.findIndex(
      (data) => data.id === productId,
    );
    console.log(productIndex);
    const updatedProduct = this.products[productIndex];
    console.log(updatedProduct);
    if (productIndex === -1) {
      return new NotFoundException('data is not available');
    }
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    return updatedProduct;
  }

  deleteProduct(productId: string) {
    const productIndex = this.products.findIndex(
      (data) => data.id === productId,
    );

    if (productIndex === -1) {
      return new NotFoundException('data is not available');
    }
    this.products.splice(productIndex, 1);
    return 'data deleted successfully';
  }
}
