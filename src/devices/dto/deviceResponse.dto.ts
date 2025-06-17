import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../profiles/models/ProfileModel';

export class DeviceResponseDto {
  @ApiProperty({ description: 'ID único del dispositivo' })
  id: string;

  @ApiProperty({ description: 'Nombre del dispositivo' })
  name: string;

  @ApiProperty({ description: 'Tipo de dispositivo' })
  type: string;

  @ApiProperty({ description: 'Profile propietario del dispositivo' })
  profile: User;

  @ApiProperty({ description: 'Fecha de creación' })
  created_at: string | null;
}

export class DeviceWithSensorsResponseDto extends DeviceResponseDto {
  @ApiProperty({ 
    description: 'Sensores del dispositivo',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        data_type: { type: 'string' },
        unit: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' }
      }
    }
  })
  sensors: any[];
}