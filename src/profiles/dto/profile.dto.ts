import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsUUID, IsOptional, IsIn, IsUrl } from 'class-validator';
import { Database } from '../../types/supabase';

type UserRole = Database['public']['Enums']['user_role'];

export class CreateUserDto {
  @ApiProperty({ description: 'UUID del usuario de Supabase Auth' })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ description: 'Email único del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'URL del avatar del usuario', required: false })
  @IsOptional()
  @IsUrl()
  avatar_url?: string;

  @ApiProperty({ description: 'Rol del usuario', enum: ['USER', 'ADMIN'], required: false })
  @IsOptional()
  @IsIn(['USER', 'ADMIN'])
  role?: UserRole;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'Nombre completo del usuario', required: false })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({ description: 'Email único del usuario', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'URL del avatar del usuario', required: false })
  @IsOptional()
  @IsUrl()
  avatar_url?: string;

  @ApiProperty({ description: 'Rol del usuario', enum: ['USER', 'ADMIN'], required: false })
  @IsOptional()
  @IsIn(['USER', 'ADMIN'])
  role?: UserRole;
}
