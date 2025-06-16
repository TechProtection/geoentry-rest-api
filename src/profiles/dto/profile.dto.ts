import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsUUID, IsOptional, IsEnum, IsUrl } from 'class-validator';
import { Role } from '../models/ProfileRole';

export class CreateUserDto {
  @ApiProperty({ description: 'UUID del usuario de Supabase Auth' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Email único del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'URL del avatar del usuario', required: false })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiProperty({ description: 'Rol del usuario', enum: Role, required: false })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ description: 'ID de la ubicación del usuario', required: false })
  @IsOptional()
  @IsUUID()
  locationId?: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'Nombre completo del usuario', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ description: 'Email único del usuario', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'URL del avatar del usuario', required: false })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiProperty({ description: 'Rol del usuario', enum: Role, required: false })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ description: 'ID de la ubicación del usuario', required: false })
  @IsOptional()
  @IsUUID()
  locationId?: string;
}
