import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { RecipeHelperService, RecipeMapperService } from 'src/services';
import { RecipeResponseDto } from 'src/dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';

@Controller('recipe-helper')
export class RecipeHelperController {
  constructor(
    private readonly recipeHelperService: RecipeHelperService,
    private readonly recipeMapperService: RecipeMapperService,
  ) {}

  @Get()
  async getHome(@Req() request: Request): Promise<RecipeResponseDto[]> {
    const recipes = await this.recipeHelperService.getDataHome();
    return recipes.map((recipe) =>
      this.recipeMapperService.mapToResponseDto(recipe, request),
    );
  }

  @Get('search')
  async searchRecipe(
    @Req() request: Request,
    @Query() query: { category_id: number; search: string },
  ): Promise<RecipeResponseDto[]> {
    const recipes = await this.recipeHelperService.searchRecipe(
      query.category_id,
      query.search,
    );
    return recipes.map((recipe) =>
      this.recipeMapperService.mapToResponseDto(recipe, request),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('panels/:id/user')
  async getPanels(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<RecipeResponseDto[]> {
    const recipes = await this.recipeHelperService.getDataPanels(id);
    return recipes.map((recipe) =>
      this.recipeMapperService.mapToResponseDto(recipe, request),
    );
  }
}
