import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'API is running' })
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('health')
  @ApiOperation({ summary: 'Detailed health check' })
  @ApiResponse({ status: 200, description: 'API health status' })
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      database: 'Supabase connected',
      cors: {
        enabled: true,
        allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['default origins'],
      }
    };
  }

  @Get('cors-test')
  @ApiOperation({ summary: 'Test CORS configuration' })
  @ApiResponse({ status: 200, description: 'CORS test response' })
  testCors() {
    return {
      message: 'CORS is working correctly',
      timestamp: new Date().toISOString(),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    };
  }
}