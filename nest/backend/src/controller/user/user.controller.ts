import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto, LoginResponseDto, RegisterDto } from 'src/dto';
import { User } from 'src/model';
import { UserService } from 'src/services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() user: RegisterDto,
    @Req() request: Request,
  ): Promise<User> {
    return await this.userService.create(user, request);
  }

  @Get('verify/:token')
  @HttpCode(HttpStatus.OK)
  async verify(@Param('token') token: string, @Res() response: Response) {
    await this.userService.verify(token, response);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginDto): Promise<LoginResponseDto> {
    const userLogin = await this.userService.login(user);
    return {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      token: userLogin.token,
    };
  }
}
