/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto } from 'src/dto';
import { User } from 'src/model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailer: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: RegisterDto, request: Request): Promise<User> {
    try {
      const userOld = await this.userRepository.findOne({
        where: {
          email: user.email,
        },
      });
      if (userOld) {
        throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
      }

      const token = uuidv4();
      const url = `${request.protocol}://${request.get('host')}/api/v1/user/verify/${token}`;

      await this.mailer.sendMail({
        to: user.email,
        from: 'Prueba nestjs <prueba@nestjs.com>',
        subject: 'Verificación de correo electrónico',
        text: `Hola ${user.name}, para verificar tu correo electrónico, haz clic en el siguiente enlace: ${url}`,
      });

      const newUser = this.userRepository.create({
        ...user,
        password: await bcrypt.hash(user.password, 10),
        token,
      });
      return this.userRepository.save(newUser);
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

  async verify(token: string, response: Response): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { token, state_id: 2 },
      });
      if (!user) {
        throw new HttpException('El usuario no existe', HttpStatus.BAD_REQUEST);
      }
      await this.userRepository.update(user.id, { state_id: 1 });
      response.redirect(`${process.env.URL_FRONTEND}/login`);
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

  async login(user: LoginDto): Promise<User> {
    const userLogin = await this.userRepository.findOne({
      where: { email: user.email, state_id: 1 },
    });
    if (!userLogin) {
      throw new HttpException('El usuario no existe', HttpStatus.BAD_REQUEST);
    }
    const isMatch = await bcrypt.compare(user.password, userLogin.password);
    if (!isMatch) {
      throw new HttpException(
        'La contraseña es incorrecta',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    const token = this.jwtService.sign(payload);
    return {
      ...userLogin,
      token,
    };
  }
}
