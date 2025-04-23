import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'src', 'assets', 'uploads'), {
    prefix: '/uploads/',
  });

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
