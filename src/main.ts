import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/SwaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  app.enableCors();

  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configurar Swagger UI
  SwaggerConfig.setup(app);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  const baseUrl = 'https://geoentry-rest-api.onrender.com'
  
  console.log(`🚀 Application is running on: ${baseUrl}`);
  console.log(`📚 Swagger UI is available at: ${baseUrl}/swagger-ui`);
  console.log(`� API endpoints available at: ${baseUrl}/api/`);
  console.log(`📋 Health check: ${baseUrl}/api/health`);
  console.log(`📍 Locations API: ${baseUrl}/api/locations`);
  console.log(`📱 Devices API: ${baseUrl}/api/devices`);
  console.log(`👥 Users API: ${baseUrl}/api/users`);
  console.log(`🔌 Sensors API: ${baseUrl}/api/sensors`);
  console.log(`📡 Proximity Events API: ${baseUrl}/api/proximity-events`);
}

bootstrap().catch((error) => {
  console.error('❌ Error starting the application:', error);
  process.exit(1);
});