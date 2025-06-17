import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { Tables } from '../../types/supabase';
import { User } from '../../profiles/models/ProfileModel';

type DeviceRow = Tables<'devices'>;

export class Device implements DeviceRow {
  @ApiProperty({ description: 'ID único del dispositivo' })
  id: string;

  @ApiProperty({ description: 'Nombre del dispositivo' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de dispositivo' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'ID del profile propietario' })
  profile_id: string;

  @ApiProperty({ description: 'Fecha de creación' })
  created_at: string | null;

  // Relaciones (no están en Supabase types, pero las necesitamos para el modelo)
  @ApiProperty({ 
    description: 'Sensores del dispositivo',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        data_type: { type: 'string' },
        unit: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' }
      }
    }
  })
  sensors?: any[];
}