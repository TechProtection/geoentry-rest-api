import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsIn, IsOptional, IsUrl, IsUUID } from 'class-validator';
import { Database, Tables } from '../../types/supabase';
import { Location } from '../../locations/models/LocationModel';
import { Device } from '../../devices/models/DeviceModel';

type UserRole = Database['public']['Enums']['user_role'];
type ProfileRow = Tables<'profiles'>;

export class User implements ProfileRow {
  @ApiProperty({ description: 'UUID del usuario de Supabase Auth' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Nombre completo del usuario' })
  @IsString()
  full_name: string;

  @ApiProperty({ description: 'Email único del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'URL del avatar del usuario', required: false })
  @IsOptional()
  @IsUrl()
  avatar_url: string | null;

  @ApiProperty({ description: 'Rol del usuario', enum: ['USER', 'ADMIN'] })
  @IsIn(['USER', 'ADMIN'])
  role: UserRole | null;

  @ApiProperty({ description: 'Fecha de creación' })
  created_at: string | null;

  @ApiProperty({ description: 'Fecha de actualización' })
  updated_at: string | null;

  // Relaciones (no están en Supabase types, pero las necesitamos para el modelo)
  @ApiProperty({ description: 'Dispositivos del usuario', type: () => [Device] })
  devices?: Device[];
}