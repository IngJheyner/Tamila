/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RecipeDto {
  id?: number;
  @ApiProperty({ description: 'Nombre de la receta' })
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  name: string;
  slug?: string;
  @ApiProperty({ description: 'Tiempo de la receta' })
  @IsNotEmpty({ message: 'El tiempo es requerido.' })
  time: string;
  @ApiProperty({ description: 'Descripción de la receta' })
  @IsNotEmpty({ message: 'La descripción es requerida.' })
  description: string;
  @IsNotEmpty({ message: 'La fecha es requerida.' })
  date: Date;
  @ApiProperty({ description: 'Imagen de la receta' })
  image?: string;
  @ApiProperty({ description: 'Categoría de la receta' })
  @IsNotEmpty({ message: 'La categoría es requerida.' })
  category_id: number;
  @ApiProperty({ description: 'Usuario de la receta' })
  @IsNotEmpty({ message: 'El usuario es requerido.' })
  user_id: number;
}
