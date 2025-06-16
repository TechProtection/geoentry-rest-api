import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('GeoEntry REST API')
      .setDescription('API para gestión de usuarios, dispositivos, sensores IoT y ubicaciones geográficas')
      .setVersion('1.0')
      .addTag('devices', 'Operaciones de dispositivos IoT')
      .addTag('sensors', 'Operaciones de sensores')
      .addTag('locations', 'Operaciones de ubicaciones geográficas')
      .addTag('profiles', 'Operaciones de perfiles/usuarios')
      .addBearerAuth()
      .addServer('http://localhost:3000', 'Servidor de desarrollo')
      .setContact(
        'GeoEntry API Support',
        'https://github.com/tu-usuario/geoentry-rest-api',
        'support@geoentry.com'
      )
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    
    // Configurar Swagger UI en la ruta /swagger-ui
    SwaggerModule.setup('swagger-ui', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        showRequestHeaders: true,
        tryItOutEnabled: true,
      },
      customSiteTitle: 'GeoEntry API Documentation',
      customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin: 20px 0; }
        .swagger-ui .info .title { color: #3b82f6; }
      `,
    });

    // También crear una ruta alternativa /api/docs por compatibilidad
    SwaggerModule.setup('api/docs', app, document);
  }
}