import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { RecipeService, RecipeMapperService } from 'src/services';
import { RecipeDto, RecipeResponseDto } from 'src/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly recipeMapperService: RecipeMapperService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async index(@Req() request: Request): Promise<RecipeResponseDto[]> {
    const recipes = await this.recipeService.getAll();
    return recipes.map((recipe) => this.recipeMapperService.mapToResponseDto(recipe, request));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(
    @Param('id') id: number,
    @Req() request: Request,
  ): Promise<RecipeResponseDto> {
    const recipe = await this.recipeService.getById(id);
    return this.recipeMapperService.mapToResponseDto(recipe, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/assets/uploads/recipes',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async store(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body() recipe: RecipeDto,
    @Req() request: Request,
  ): Promise<RecipeResponseDto> {
    const newRecipe = await this.recipeService.create(recipe, file?.filename);
    return this.recipeMapperService.mapToResponseDto(newRecipe, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/assets/uploads/recipes',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updated(
    @Param('id') id: number,
    @Body() recipe: RecipeDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<RecipeResponseDto> {
    const updatedRecipe = await this.recipeService.update(
      id,
      recipe,
      file?.filename,
    );
    return this.recipeMapperService.mapToResponseDto(updatedRecipe, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number): Promise<void> {
    await this.recipeService.delete(id);
  }
}
