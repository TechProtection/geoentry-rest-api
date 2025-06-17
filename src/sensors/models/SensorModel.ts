import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Tables } from '../../types/supabase';

type SensorRow = Tables<'sensors'>;

export class Sensor implements SensorRow {
  @ApiProperty({ description: 'ID único del sensor' })
  id: string;

  @ApiProperty({ description: 'Nombre del sensor' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de datos del sensor' })
  @IsString()
  data_type: string;

  @ApiProperty({ description: 'Unidad de medida' })
  @IsString()
  unit: string;

  @ApiProperty({ description: 'ID del dispositivo al que pertenece' })
  device_id: string;

  @ApiProperty({ description: 'Fecha de creación' })
  created_at: string | null;

  // Relaciones (no están en Supabase types, pero las necesitamos para el modelo)
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
  device?: any;
}