import { ApiProperty } from '@nestjs/swagger';

export class SensorResponseDto {
  @ApiProperty({ description: 'ID único del sensor' })
  id: string;

  @ApiProperty({ description: 'Nombre del sensor' })
  name: string;

  @ApiProperty({ description: 'Tipo de datos del sensor' })
  data_type: string;

  @ApiProperty({ description: 'Unidad de medida' })
  unit: string;

  @ApiProperty({ description: 'Fecha de creación' })
  created_at: string | null;
}

export class SensorWithDeviceResponseDto extends SensorResponseDto {
  @ApiProperty({ 
    description: 'Dispositivo al que pertenece el sensor',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      type: { type: 'string' },
      created_at: { type: 'string', format: 'date-time' }
    }
  })
  device: any;
}