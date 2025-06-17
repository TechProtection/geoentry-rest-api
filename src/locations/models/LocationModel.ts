import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Tables } from '../../types/supabase';

type LocationRow = Tables<'locations'>;

export class Location implements LocationRow {
  @ApiProperty({ description: 'ID único de la ubicación' })
  id: string;

  @ApiProperty({ description: 'Nombre de la ubicación' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Latitud' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitud' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Dirección' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Radio en metros' })
  @IsNumber()
  radius: number;

  @ApiProperty({ description: 'Si la ubicación está activa' })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ description: 'ID del profile asociado', required: false })
  @IsOptional()
  profile_id: string | null;

  @ApiProperty({ description: 'Fecha de creación' })
  created_at: string | null;
}