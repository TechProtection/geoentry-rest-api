import { ApiProperty } from '@nestjs/swagger';

export class SensorResponseDto {
  @ApiProperty({ description: 'ID único del sensor' })
  id: string;

  @ApiProperty({ description: 'Nombre del sensor' })
  name: string;

  @ApiProperty({ description: 'Tipo de datos del sensor' })
  dataType: string;

  @ApiProperty({ description: 'Unidad de medida' })
  unit: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}

export class SensorWithDeviceResponseDto extends SensorResponseDto {
  @ApiProperty({ 
    description: 'Dispositivo al que pertenece el sensor',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      type: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' }
    }
  })
  device: any;
}