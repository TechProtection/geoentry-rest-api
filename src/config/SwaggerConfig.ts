import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
export class SwaggerConfig {

  static setup(app: INestApplication): void {

    const config = new DocumentBuilder()
      .setTitle('GeoEntry REST API')
      .setDescription('API para gestión de usuarios, dispositivos, sensores IoT y ubicaciones geográficas')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'JWT-auth'
      )
      .addServer('http://localhost:3000', 'Servidor de desarrollo local')
      .addServer('https://geoentry-rest-api.onrender.com', 'Servidor de producción')
      .setContact(
        'GeoEntry API Support',
        'https://github.com/TechProtection/geoentry-rest-api',
        'support@geoentry.com',
      )
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

    // Swagger clásico en /swagger
    SwaggerModule.setup('swagger-ui', app, document, {
      customSiteTitle: 'GeoEntry API Docs',
    });

  }

}

