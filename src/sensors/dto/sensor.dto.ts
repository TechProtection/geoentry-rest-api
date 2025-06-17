import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSensorDto {
  @ApiProperty({ description: 'Nombre del sensor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Tipo de datos del sensor' })
  @IsString()
  @IsNotEmpty()
  data_type: string;

  @ApiProperty({ description: 'Unidad de medida' })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({ description: 'ID del dispositivo al que pertenece' })
  @IsUUID()
  @IsNotEmpty()
  device_id: string;
}

export class UpdateSensorDto {
  @ApiProperty({ description: 'Nombre del sensor', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Tipo de datos del sensor', required: false })
  @IsString()
  data_type?: string;

  @ApiProperty({ description: 'Unidad de medida', required: false })
  @IsString()
  unit?: string;

  @ApiProperty({ description: 'ID del dispositivo al que pertenece', required: false })
  @IsUUID()
  device_id?: string;
}
