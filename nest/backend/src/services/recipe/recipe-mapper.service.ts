import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IRecipe } from 'src/interfaces/recipe.interface';
import { RecipeResponseDto } from 'src/dto/recipe/recipe-response.dto';

@Injectable()
export class RecipeMapperService {
  mapToResponseDto(recipe: IRecipe, request: Request): RecipeResponseDto {
    const categoryId =
      typeof recipe.category_id === 'object'
        ? recipe.category_id.id
        : recipe.category_id;

    const categoryName =
      typeof recipe.category_id === 'object' ? recipe.category_id.name : null;

    const userId =
      typeof recipe.user_id === 'object' ? recipe.user_id.id : recipe.user_id;

    const userName =
      typeof recipe.user_id === 'object' ? recipe.user_id.name : null;

    return {
      id: recipe.id,
      name: recipe.name,
      slug: recipe.slug,
      time: recipe.time,
      date: recipe.date,
      image: recipe.image
        ? `${request.protocol}://${request.get('Host')}/uploads/recipes/${recipe.image}`
        : null,
      description: recipe.description,
      category_id: categoryId,
      category: categoryName,
      user_id: userId,
      user: userName,
    };
  }
}
