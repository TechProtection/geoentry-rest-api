import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SensorService } from '../services/SensorService';
import { Sensor } from '../models/SensorModel';
import { CreateSensorDto, UpdateSensorDto } from '../dto/sensor.dto';
import { SensorWithDeviceResponseDto } from '../dto/sensorResponse.dto';

@ApiTags('sensors')
@Controller('api/sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los sensores' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de sensores con información del dispositivo', 
    type: [SensorWithDeviceResponseDto] 
  })
  async getAllSensors(): Promise<Sensor[]> {
    return await this.sensorService.getAllSensors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener sensor por ID' })
  @ApiParam({ name: 'id', description: 'ID del sensor (UUID)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Sensor encontrado con información del dispositivo', 
    type: SensorWithDeviceResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Sensor no encontrado' })
  async getSensor(@Param('id') id: string): Promise<Sensor> {
    return await this.sensorService.getSensorById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo sensor' })
  @ApiResponse({ status: 201, description: 'Sensor creado exitosamente', type: Sensor })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async createSensor(@Body() sensorDto: CreateSensorDto): Promise<Sensor> {
    const sensorData = {
      name: sensorDto.name,
      dataType: sensorDto.dataType,
      unit: sensorDto.unit,
      device: { id: sensorDto.deviceId } as any
    };
    return await this.sensorService.createSensor(sensorData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un sensor' })
  @ApiParam({ name: 'id', description: 'ID del sensor' })
  @ApiResponse({ status: 200, description: 'Sensor actualizado exitosamente', type: Sensor })
  @ApiResponse({ status: 404, description: 'Sensor no encontrado' })
  async updateSensor(
    @Param('id') id: string,
    @Body() sensorDto: UpdateSensorDto
  ): Promise<Sensor> {
    const sensorData: any = {};
    if (sensorDto.name) sensorData.name = sensorDto.name;
    if (sensorDto.dataType) sensorData.dataType = sensorDto.dataType;
    if (sensorDto.unit) sensorData.unit = sensorDto.unit;
    if (sensorDto.deviceId) sensorData.device = { id: sensorDto.deviceId } as any;
    
    return await this.sensorService.updateSensor(id, sensorData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un sensor' })
  @ApiParam({ name: 'id', description: 'ID del sensor' })
  @ApiResponse({ status: 200, description: 'Sensor eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Sensor no encontrado' })
  async deleteSensor(@Param('id') id: string): Promise<void> {
    return await this.sensorService.deleteSensor(id);
  }
}