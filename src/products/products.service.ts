import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto} from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(search?: string): Promise<Product[]> {
    if (search) {
      return this.productRepository
        .createQueryBuilder('product')
        .where('product.name ILIKE :search', { search: `%${search}%` })
        .orWhere('product.description ILIKE :search', { search: `%${search}%` })
        .getMany();
    }
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File, 
  ): Promise<Product> {
    if (!file) {
      throw new Error('File is required');
    }

    
    const uploadResult = await this.cloudinaryService.uploadImage(file);
console.log(uploadResult);
  
    const product = this.productRepository.create({
      ...createProductDto,
      imageUrl: uploadResult.secure_url, 
    });

   
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductInput,
    file?: Express.Multer.File,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (file) {
      if (product.imageUrl) {
        const publicId = product.imageUrl.split('/').pop().split('.')[0]; 
        await this.cloudinaryService.deleteImage(publicId);
      }
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      product.imageUrl = uploadResult.secure_url;
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    if (product.imageUrl) {
      const publicId = product.imageUrl.split('/').pop().split('.')[0];
      await this.cloudinaryService.deleteImage(publicId);
    }
    await this.productRepository.remove(product);
  }
}
