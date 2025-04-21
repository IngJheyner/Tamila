import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger
  const config = new DocumentBuilder()
    .setTitle('API Recetas desde el curso de NestJS, Tamila.')
    .setDescription('Recipe API description')
    .setVersion('1.0')
    .addTag('recipe')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  // cors
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
