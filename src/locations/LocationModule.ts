import { Module } from '@nestjs/common';
import { LocationController } from './controllers/LocationController';
import { LocationService } from './services/LocationService';
import { LocationRepository } from './repository/LocationRepository';

@Module({
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
  exports: [LocationService, LocationRepository],
})
export class LocationModule {}
