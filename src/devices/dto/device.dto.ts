import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ description: 'Nombre del dispositivo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Tipo de dispositivo' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'ID del usuario propietario' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

export class UpdateDeviceDto {
  @ApiProperty({ description: 'Nombre del dispositivo', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Tipo de dispositivo', required: false })
  @IsString()
  type?: string;

  @ApiProperty({ description: 'ID del usuario propietario', required: false })
  @IsUUID()
  userId?: string;
}
