import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { User } from '../../profiles/models/ProfileModel';

export class Device {
  @ApiProperty({ description: 'ID único del dispositivo' })
  id: string;

  @ApiProperty({ description: 'Nombre del dispositivo' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de dispositivo' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Usuario propietario del dispositivo' })
  user: User;

  @ApiProperty({ 
    description: 'Sensores del dispositivo',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        dataType: { type: 'string' },
        unit: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  sensors: any[];

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}