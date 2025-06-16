import { Module } from '@nestjs/common';
import { DeviceController } from './controllers/DeviceController';
import { DeviceService } from './services/DeviceService';
import { DeviceRepository } from './repository/DeviceRepository';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
  exports: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
