import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DeviceService } from '../services/DeviceService';
import { Device } from '../models/DeviceModel';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto';
import { DeviceWithSensorsResponseDto } from '../dto/deviceResponse.dto';


@ApiTags('devices')
@Controller('api/devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los dispositivos' })
  @ApiResponse({ status: 200, description: 'Lista de dispositivos', type: [DeviceWithSensorsResponseDto] })
  async getAllDevices(): Promise<Device[]> {
    return await this.deviceService.getAllDevices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener dispositivo por ID' })
  @ApiParam({ name: 'id', description: 'ID del dispositivo' })
  @ApiResponse({ status: 200, description: 'Dispositivo encontrado', type: DeviceWithSensorsResponseDto })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado' })
  async getDevice(@Param('id') id: string): Promise<Device> {
    return await this.deviceService.getDeviceById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo dispositivo' })
  @ApiResponse({ status: 201, description: 'Dispositivo creado exitosamente', type: Device })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async createDevice(@Body() deviceDto: CreateDeviceDto): Promise<Device> {
    const deviceData = {
      name: deviceDto.name,
      type: deviceDto.type,
      user: { id: deviceDto.userId } as any
    };
    return await this.deviceService.createDevice(deviceData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un dispositivo' })
  @ApiParam({ name: 'id', description: 'ID del dispositivo' })
  @ApiResponse({ status: 200, description: 'Dispositivo actualizado exitosamente', type: Device })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado' })
  async updateDevice(
    @Param('id') id: string,
    @Body() deviceDto: UpdateDeviceDto
  ): Promise<Device> {
    const deviceData: any = {};
    if (deviceDto.name) deviceData.name = deviceDto.name;
    if (deviceDto.type) deviceData.type = deviceDto.type;
    if (deviceDto.userId) deviceData.user = { id: deviceDto.userId };
    
    return await this.deviceService.updateDevice(id, deviceData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un dispositivo' })
  @ApiParam({ name: 'id', description: 'ID del dispositivo' })
  @ApiResponse({ status: 200, description: 'Dispositivo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Dispositivo no encontrado' })
  async deleteDevice(@Param('id') id: string): Promise<void> {
    return await this.deviceService.deleteDevice(id);
  }
}