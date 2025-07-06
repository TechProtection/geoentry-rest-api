import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsIn, IsBoolean } from 'class-validator';

export class CreateSensorDto {
  @ApiProperty({ description: 'Nombre del sensor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'Tipo de dispositivo', 
    enum: ['led_tv', 'smart_light', 'air_conditioner', 'coffee_maker']
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['led_tv', 'smart_light', 'air_conditioner', 'coffee_maker'])
  sensor_type: 'led_tv' | 'smart_light' | 'air_conditioner' | 'coffee_maker';

  @ApiProperty({ description: 'Si el sensor está activo', default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'ID del usuario propietario' })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ 
    description: 'Estado inicial del sensor', 
    required: false, 
    enum: ['on', 'off'], 
    default: 'off' 
  })
  @IsOptional()
  @IsString()
  @IsIn(['on', 'off'])
  status?: string;
}

export class UpdateSensorDto {
  @ApiProperty({ description: 'Nombre del sensor', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ 
    description: 'Tipo de dispositivo', 
    required: false,
    enum: ['led_tv', 'smart_light', 'air_conditioner', 'coffee_maker']
  })
  @IsOptional()
  @IsString()
  @IsIn(['led_tv', 'smart_light', 'air_conditioner', 'coffee_maker'])
  sensor_type?: 'led_tv' | 'smart_light' | 'air_conditioner' | 'coffee_maker';

  @ApiProperty({ description: 'Si el sensor está activo', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ 
    description: 'Estado del sensor', 
    required: false, 
    enum: ['on', 'off'] 
  })
  @IsOptional()
  @IsString()
  @IsIn(['on', 'off'])
  status?: string;
}

export class UpdateSensorStatusDto {
  @ApiProperty({ 
    description: 'Estado del sensor', 
    enum: ['on', 'off'],
    example: 'on'
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['on', 'off'])
  status: string;
}

export class CreateSensorForUserDto {
  @ApiProperty({ description: 'Nombre del sensor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'Tipo de dispositivo', 
    enum: ['led_tv', 'smart_light', 'air_conditioner', 'coffee_maker']
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['led_tv', 'smart_light', 'air_conditioner', 'coffee_maker'])
  sensor_type: 'led_tv' | 'smart_light' | 'air_conditioner' | 'coffee_maker';

  @ApiProperty({ description: 'Si el sensor está activo', default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ 
    description: 'Estado inicial del sensor', 
    required: false, 
    enum: ['on', 'off'], 
    default: 'off' 
  })
  @IsOptional()
  @IsString()
  @IsIn(['on', 'off'])
  status?: string;
}
