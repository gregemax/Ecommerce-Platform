import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import * as GraphQLUpload  from "graphql-upload/GraphQLUpload.js"
import * as FileUpload  from "graphql-upload/Upload.js"
@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query((returns) => [Product])
  async products(
    @Args('search', { nullable: true }) search?: string,
  ): Promise<Product[]> {
    return this.productService.findAll(search);
  }

  @Query((returns) => Product)
  async product(@Args('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductDto') createProductDto: CreateProductDto,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: FileUpload,
  ): Promise<Product> {
    
    return this.productService.create(createProductDto, file);
  }

  @Mutation((returns) => Product)
  async updateProduct(
    @Args('id') id: number,
    @Args('updateProductDto') updateProductDto: UpdateProductInput,
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true })
    file?: FileUpload,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto, file);
  }

  @Mutation((returns) => Boolean)
  async deleteProduct(@Args('id') id: number): Promise<boolean> {
    await this.productService.remove(id);
    return true;
  }
}
