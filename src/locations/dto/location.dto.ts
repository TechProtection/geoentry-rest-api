import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Nombre de la ubicación', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Latitud' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Longitud' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ description: 'Dirección', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Radio en metros', required: false })
  @IsOptional()
  @IsNumber()
  radius?: number;

  @ApiProperty({ description: 'Si la ubicación está activa', required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'ID del profile asociado', required: false })
  @IsOptional()
  @IsUUID()
  profile_id?: string;
}

export class UpdateLocationDto {
  @ApiProperty({ description: 'Nombre de la ubicación', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Latitud', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ description: 'Longitud', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ description: 'Dirección', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Radio en metros', required: false })
  @IsOptional()
  @IsNumber()
  radius?: number;

  @ApiProperty({ description: 'Si la ubicación está activa', required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'ID del profile asociado', required: false })
  @IsOptional()
  @IsUUID()
  profile_id?: string;
}
