/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dto/category.dto';
import { Category, Recipe } from 'src/model';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getById(id: number): Promise<Category> {
    try {
      const data = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!data) {
        throw new HttpException('La categoría no existe.', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: `${error.status}`,
          message: `${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(category: CategoryDto): Promise<Category> {
    try {
      const data = await this.categoryRepository.findOne({
        where: { name: category.name },
      });

      if (data) {
        throw new HttpException(
          'La categoría ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      const save = this.categoryRepository.create(category);

      return await this.categoryRepository.save(save);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: `${error.status}`,
          message: `${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, category: CategoryDto): Promise<Category> {
    try {
      await this.getById(id);

      await this.categoryRepository.update(id, category);

      const data = await this.getById(id);

      return data;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: `${error.status}`,
          message: `${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.getById(id);

      const exist = await this.recipeRepository.findOne({
        where: { category_id: { id } },
      });

      if (exist) {
        throw new HttpException(
          'La categoría no puede ser eliminada porque tiene recetas asociadas.',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.categoryRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: `${error.status}`,
          message: `${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
