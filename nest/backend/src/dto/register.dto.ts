/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  name: string;

  @ApiProperty({ description: 'Email del usuario' })
  @IsNotEmpty({ message: 'El email es requerido.' })
  @IsEmail({}, { message: 'El email no es válido.' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  password: string;
}
