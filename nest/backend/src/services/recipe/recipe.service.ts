/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeDto } from 'src/dto';
import { Recipe } from 'src/model';
import { Repository } from 'typeorm';
import { CategoryService } from '../index';
import * as fs from 'fs';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(): Promise<Recipe[]> {
    try {
      return await this.recipeRepository.find({
        select: {
          id: true,
          name: true,
          slug: true,
          time: true,
          date: true,
          image: true,
          category_id: true,
          user_id: true,
        },
        relations: {
          category_id: true,
          user_id: true,
        },
        order: {
          id: 'DESC',
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: number): Promise<Recipe> {
    try {
      const recipe = await this.recipeRepository.findOne({
        where: { id },
        relations: {
          category_id: true,
          user_id: true,
        },
      });

      if (!recipe) {
        throw new HttpException('La receta no existe', HttpStatus.NOT_FOUND);
      }

      return recipe;
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

  async create(recipe: RecipeDto, image?: string): Promise<Recipe> {
    try {
      await this.categoryService.getById(recipe.category_id);
      const recipeOld = await this.recipeRepository.findOne({
        where: {
          name: recipe.name,
        },
      });
      if (recipeOld) {
        throw new HttpException('La receta ya existe', HttpStatus.BAD_REQUEST);
      }
      const newRecipe = this.recipeRepository.create({
        ...recipe,
        image: image || null,
        category_id: recipe.category_id,
        user_id: recipe.user_id,
      });
      return await this.recipeRepository.save(newRecipe);
    } catch (error) {
      console.log(error);
      if (image) {
        const imagePath = `src/assets/uploads/recipes/${image}`;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      throw new HttpException(
        {
          statusCode:
            parseInt(error.response.statusCode) ||
            HttpStatus.BAD_REQUEST ||
            HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        },
        parseInt(error.response.statusCode) ||
          HttpStatus.BAD_REQUEST ||
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, recipe: RecipeDto, image?: string): Promise<Recipe> {
    try {
      const recipeToUpdate = await this.getById(id);
      const category = await this.categoryService.getById(recipe.category_id);

      if (recipeToUpdate.image && image) {
        const imagePath = `src/assets/uploads/recipes/${recipeToUpdate.image}`;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await this.recipeRepository.update(id, {
        ...recipe,
        image: image || recipeToUpdate.image,
        category_id: category,
      });

      const data = await this.getById(id);

      return data;
    } catch (error) {
      throw new HttpException(
        {
          statusCode:
            parseInt(error.response.statusCode) ||
            HttpStatus.BAD_REQUEST ||
            HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        },
        parseInt(error.response.statusCode) ||
          HttpStatus.BAD_REQUEST ||
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const recipe = await this.getById(id);
      if (recipe.image) {
        const imagePath = `src/assets/uploads/recipes/${recipe.image}`;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await this.recipeRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          statusCode:
            parseInt(error.response.statusCode) ||
            HttpStatus.BAD_REQUEST ||
            HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        },
        parseInt(error.response.statusCode) ||
          HttpStatus.BAD_REQUEST ||
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
