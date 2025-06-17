import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Tables } from '../../types/supabase';

type ProximityEventRow = Tables<'proximity_events'>;

export class ProximityEvent implements ProximityEventRow {
  @ApiProperty({ description: 'ID único del evento de proximidad' })
  id: string;

  @ApiProperty({ description: 'Tipo de evento' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Latitud del evento' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitud del evento' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Distancia en metros' })
  @IsNumber()
  distance: number;

  @ApiProperty({ description: 'ID de la ubicación de casa' })
  @IsString()
  home_location_id: string;

  @ApiProperty({ description: 'Nombre de la ubicación de casa' })
  @IsString()
  home_location_name: string;

  @ApiProperty({ description: 'ID del dispositivo', required: false })
  @IsOptional()
  device_id: string | null;

  @ApiProperty({ description: 'ID del usuario', required: false })
  @IsOptional()
  user_id: string | null;

  @ApiProperty({ description: 'Fecha de creación' })
  created_at: string | null;
}
