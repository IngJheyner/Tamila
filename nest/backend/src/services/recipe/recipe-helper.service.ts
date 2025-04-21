/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/model';
import { Like, Repository } from 'typeorm';

@Injectable()
export class RecipeHelperService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async getDataHome(): Promise<Recipe[]> {
    try {
      return await this.recipeRepository.find({
        relations: {
          category_id: true,
        },
        order: {
          id: 'DESC',
        },
        skip: 0,
        take: 3,
      });
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

  async searchRecipe(category_id: number, search: string): Promise<Recipe[]> {
    try {
      return await this.recipeRepository.find({
        where: {
          name: Like(`%${search}%`),
          category_id: {
            id: category_id,
          },
        },
        order: {
          id: 'DESC',
        },
      });
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

  async getDataPanels(id: number): Promise<Recipe[]> {
    try {
      return await this.recipeRepository.find({
        where: {
          user_id: {
            id: id,
          },
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
