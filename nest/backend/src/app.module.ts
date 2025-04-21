import { Module } from '@nestjs/common';
import { ExampleController } from './controller/example/example.controller';
// Archivo .env
import { ConfigModule } from '@nestjs/config';
// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category, Recipe, Contact, State, User } from './model';
import {
  CategoryService,
  RecipeService,
  RecipeHelperService,
  ContactService,
  UserService,
  RecipeMapperService,
} from './services';
import {
  CategoryController,
  RecipeController,
  RecipeHelperController,
  ContactController,
  UserController,
} from './controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([State, User, Category, Recipe, Contact]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_SERVER,
      port: parseInt(process.env.DATABASE_PORT ?? '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_SERVER,
        port: parseInt(process.env.SMTP_PORT ?? '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    ExampleController,
    CategoryController,
    RecipeController,
    RecipeHelperController,
    ContactController,
    UserController,
  ],
  providers: [
    CategoryService,
    RecipeService,
    RecipeHelperService,
    ContactService,
    UserService,
    JwtStrategy,
    RecipeMapperService,
  ],
})
export class AppModule {}
