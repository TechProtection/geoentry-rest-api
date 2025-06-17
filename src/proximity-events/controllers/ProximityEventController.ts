import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProximityEventService } from '../services/ProximityEventService';
import { ProximityEvent } from '../models/ProximityEventModel';
import { CreateProximityEventDto, UpdateProximityEventDto } from '../dto/proximity-event.dto';

@ApiTags('proximity-events')
@Controller('proximity-events')
export class ProximityEventController {
  constructor(private readonly proximityEventService: ProximityEventService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los eventos de proximidad' })
  @ApiResponse({ status: 200, description: 'Lista de eventos de proximidad', type: [ProximityEvent] })
  async getAllProximityEvents(): Promise<ProximityEvent[]> {
    return await this.proximityEventService.getAllProximityEvents();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener eventos de proximidad por ID de usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Eventos de proximidad del usuario', type: [ProximityEvent] })
  async getProximityEventsByUserId(@Param('userId') userId: string): Promise<ProximityEvent[]> {
    return await this.proximityEventService.getProximityEventsByUserId(userId);
  }

  @Get('device/:deviceId')
  @ApiOperation({ summary: 'Obtener eventos de proximidad por ID de dispositivo' })
  @ApiParam({ name: 'deviceId', description: 'ID del dispositivo' })
  @ApiResponse({ status: 200, description: 'Eventos de proximidad del dispositivo', type: [ProximityEvent] })
  async getProximityEventsByDeviceId(@Param('deviceId') deviceId: string): Promise<ProximityEvent[]> {
    return await this.proximityEventService.getProximityEventsByDeviceId(deviceId);
  }

  @Get('location/:locationId')
  @ApiOperation({ summary: 'Obtener eventos de proximidad por ID de ubicación' })
  @ApiParam({ name: 'locationId', description: 'ID de la ubicación' })
  @ApiResponse({ status: 200, description: 'Eventos de proximidad de la ubicación', type: [ProximityEvent] })
  async getProximityEventsByLocationId(@Param('locationId') locationId: string): Promise<ProximityEvent[]> {
    return await this.proximityEventService.getProximityEventsByLocationId(locationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener evento de proximidad por ID' })
  @ApiParam({ name: 'id', description: 'ID del evento de proximidad' })
  @ApiResponse({ status: 200, description: 'Evento de proximidad encontrado', type: ProximityEvent })
  @ApiResponse({ status: 404, description: 'Evento de proximidad no encontrado' })
  async getProximityEvent(@Param('id') id: string): Promise<ProximityEvent> {
    return await this.proximityEventService.getProximityEventById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo evento de proximidad' })
  @ApiResponse({ status: 201, description: 'Evento de proximidad creado exitosamente', type: ProximityEvent })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async createProximityEvent(@Body() proximityEventDto: CreateProximityEventDto): Promise<ProximityEvent> {
    const proximityEventData = {
      type: proximityEventDto.type,
      latitude: proximityEventDto.latitude,
      longitude: proximityEventDto.longitude,
      distance: proximityEventDto.distance,
      home_location_id: proximityEventDto.home_location_id,
      home_location_name: proximityEventDto.home_location_name,
      device_id: proximityEventDto.device_id,
      user_id: proximityEventDto.user_id
    };
    return await this.proximityEventService.createProximityEvent(proximityEventData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un evento de proximidad' })
  @ApiParam({ name: 'id', description: 'ID del evento de proximidad' })
  @ApiResponse({ status: 200, description: 'Evento de proximidad actualizado exitosamente', type: ProximityEvent })
  @ApiResponse({ status: 404, description: 'Evento de proximidad no encontrado' })
  async updateProximityEvent(
    @Param('id') id: string,
    @Body() proximityEventDto: UpdateProximityEventDto
  ): Promise<ProximityEvent> {
    const proximityEventData: any = {};
    if (proximityEventDto.type) proximityEventData.type = proximityEventDto.type;
    if (proximityEventDto.latitude !== undefined) proximityEventData.latitude = proximityEventDto.latitude;
    if (proximityEventDto.longitude !== undefined) proximityEventData.longitude = proximityEventDto.longitude;
    if (proximityEventDto.distance !== undefined) proximityEventData.distance = proximityEventDto.distance;
    if (proximityEventDto.home_location_id) proximityEventData.home_location_id = proximityEventDto.home_location_id;
    if (proximityEventDto.home_location_name) proximityEventData.home_location_name = proximityEventDto.home_location_name;
    if (proximityEventDto.device_id !== undefined) proximityEventData.device_id = proximityEventDto.device_id;
    if (proximityEventDto.user_id !== undefined) proximityEventData.user_id = proximityEventDto.user_id;
    
    return await this.proximityEventService.updateProximityEvent(id, proximityEventData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un evento de proximidad' })
  @ApiParam({ name: 'id', description: 'ID del evento de proximidad' })
  @ApiResponse({ status: 200, description: 'Evento de proximidad eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Evento de proximidad no encontrado' })
  async deleteProximityEvent(@Param('id') id: string): Promise<void> {
    return await this.proximityEventService.deleteProximityEvent(id);
  }
}
