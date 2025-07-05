import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LocationService } from '../services/LocationService';
import { Location } from '../models/LocationModel';
import { CreateLocationDto, UpdateLocationDto } from '../dto/location.dto';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ubicaciones' })
  @ApiResponse({ status: 200, description: 'Lista de ubicaciones', type: [Location] })
  async getAllLocations(): Promise<Location[]> {
    return await this.locationService.getAllLocations();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener ubicaciones por ID de usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de ubicaciones del usuario', type: [Location] })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getLocationsByUser(@Param('userId') userId: string): Promise<Location[]> {
    return await this.locationService.getLocationsByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ubicación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación' })
  @ApiResponse({ status: 200, description: 'Ubicación encontrada', type: Location })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada' })
  async getLocation(@Param('id') id: string): Promise<Location> {
    return await this.locationService.getLocationById(id);
  }
  @Post()
  @ApiOperation({ summary: 'Crear una nueva ubicación' })
  @ApiResponse({ status: 201, description: 'Ubicación creada exitosamente', type: Location })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async createLocation(@Body() locationDto: CreateLocationDto): Promise<Location> {
    return await this.locationService.createLocation(locationDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una ubicación' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación' })
  @ApiResponse({ status: 200, description: 'Ubicación actualizada exitosamente', type: Location })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada' })
  async updateLocation(
    @Param('id') id: string,
    @Body() locationDto: UpdateLocationDto
  ): Promise<Location> {
    return await this.locationService.updateLocation(id, locationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ubicación' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación' })
  @ApiResponse({ status: 200, description: 'Ubicación eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada' })
  async deleteLocation(@Param('id') id: string): Promise<void> {
    return await this.locationService.deleteLocation(id);
  }
}