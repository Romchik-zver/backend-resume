import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileResolver } from './profile.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
