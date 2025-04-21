/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class ContactDto {
  id?: number;
  @ApiProperty({ description: 'Nombre del contacto' })
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  name: string;
  @ApiProperty({ description: 'Email del contacto' })
  @IsNotEmpty({ message: 'El email es requerido.' })
  @IsEmail({}, { message: 'El email no es válido.' })
  email: string;
  @ApiProperty({ description: 'Teléfono del contacto' })
  @IsNotEmpty({ message: 'El teléfono es requerido.' })
  @IsPhoneNumber('CO', { message: 'El teléfono no es válido.' })
  phone: string;
  @ApiProperty({ description: 'Mensaje del contacto' })
  @IsNotEmpty({ message: 'El mensaje es requerido.' })
  @IsString({ message: 'El mensaje debe ser un texto.' })
  message: string;
}
