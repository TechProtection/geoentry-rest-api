import { Module } from '@nestjs/common';
import { UserController } from './controllers/ProfileController';
import { UserService } from './services/ProfileService';
import { ProfileRepository } from './repository/ProfileRepository';

@Module({
  controllers: [UserController],
  providers: [UserService, ProfileRepository],
  exports: [UserService, ProfileRepository],
})
export class ProfileModule {}
