import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class Location {
  @ApiProperty({ description: 'ID único de la ubicación' })
  id: string;

  @ApiProperty({ description: 'Latitud' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitud' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Dirección', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}