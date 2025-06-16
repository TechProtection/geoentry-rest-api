import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum, IsOptional, IsUrl, IsUUID } from 'class-validator';
import { Role } from './ProfileRole';
import { Location } from '../../locations/models/LocationModel';
import { Device } from '../../devices/models/DeviceModel';

export class User {
  @ApiProperty({ description: 'UUID del usuario de Supabase Auth' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nombre completo del usuario' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Email único del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'URL del avatar del usuario', required: false })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiProperty({ description: 'Rol del usuario', enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ description: 'Ubicación del usuario', required: false })
  @IsOptional()
  location?: Location;

  @ApiProperty({ description: 'Dispositivos del usuario', type: () => [Device] })
  devices: Device[];

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización' })
  updatedAt: Date;
}