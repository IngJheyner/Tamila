/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CategoryDto {
  id?: number;
  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  name: string;
  slug?: string;
}
