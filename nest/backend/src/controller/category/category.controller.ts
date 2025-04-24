/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import slugify from 'slugify';
import { CategoryDto } from 'src/dto/category.dto';
import { Category } from 'src/model';
import { CategoryService } from 'src/services/category/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async index(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() category: CategoryDto): Promise<Category> {
    return await this.categoryService.create(category);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() category: CategoryDto): Promise<Category> {
    return await this.categoryService.update(id, {
      name: category.name,
      slug: slugify(category.name, { lower: true }),
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number): Promise<void> {
    return await this.categoryService.delete(id);
  }
}
