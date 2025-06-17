import { Module } from '@nestjs/common';
import { ProximityEventController } from './controllers/ProximityEventController';
import { ProximityEventService } from './services/ProximityEventService';
import { ProximityEventRepository } from './repository/ProximityEventRepository';

@Module({
  controllers: [ProximityEventController],
  providers: [ProximityEventService, ProximityEventRepository],
  exports: [ProximityEventService, ProximityEventRepository],
})
export class ProximityEventModule {}
