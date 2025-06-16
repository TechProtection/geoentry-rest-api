import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/SwaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Habilitar CORS si es necesario
  app.enableCors();

  // Configurar Swagger UI
  SwaggerConfig.setup(app);

  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger UI is available at: http://localhost:${process.env.PORT ?? 3000}/swagger-ui`);
}
bootstrap();