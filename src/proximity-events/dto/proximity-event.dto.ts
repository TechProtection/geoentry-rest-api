import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateProximityEventDto {
  @ApiProperty({ description: 'Tipo de evento' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Latitud del evento' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Longitud del evento' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ description: 'Distancia en metros' })
  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @ApiProperty({ description: 'ID de la ubicación de casa' })
  @IsUUID()
  @IsNotEmpty()
  home_location_id: string;

  @ApiProperty({ description: 'Nombre de la ubicación de casa' })
  @IsString()
  @IsNotEmpty()
  home_location_name: string;

  @ApiProperty({ description: 'ID del dispositivo', required: false })
  @IsOptional()
  @IsUUID()
  device_id?: string;

  @ApiProperty({ description: 'ID del usuario', required: false })
  @IsOptional()
  @IsUUID()
  user_id?: string;
}

export class UpdateProximityEventDto {
  @ApiProperty({ description: 'Tipo de evento', required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ description: 'Latitud del evento', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ description: 'Longitud del evento', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ description: 'Distancia en metros', required: false })
  @IsOptional()
  @IsNumber()
  distance?: number;

  @ApiProperty({ description: 'ID de la ubicación de casa', required: false })
  @IsOptional()
  @IsUUID()
  home_location_id?: string;

  @ApiProperty({ description: 'Nombre de la ubicación de casa', required: false })
  @IsOptional()
  @IsString()
  home_location_name?: string;

  @ApiProperty({ description: 'ID del dispositivo', required: false })
  @IsOptional()
  @IsUUID()
  device_id?: string;

  @ApiProperty({ description: 'ID del usuario', required: false })
  @IsOptional()
  @IsUUID()
  user_id?: string;
}
