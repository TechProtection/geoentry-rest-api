import { Module } from '@nestjs/common';
import { SensorController } from './controllers/SensorController';
import { SensorService } from './services/SensorService';
import { SensorRepository } from './repository/SensorRepository';

@Module({
  controllers: [SensorController],
  providers: [SensorService, SensorRepository],
  exports: [SensorService, SensorRepository],
})
export class SensorModule {}
