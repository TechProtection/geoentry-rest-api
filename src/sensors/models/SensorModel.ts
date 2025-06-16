import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Sensor {
  @ApiProperty({ description: 'ID único del sensor' })
  id: string;

  @ApiProperty({ description: 'Nombre del sensor' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de datos del sensor' })
  @IsString()
  dataType: string;

  @ApiProperty({ description: 'Unidad de medida' })
  @IsString()
  unit: string;

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

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}