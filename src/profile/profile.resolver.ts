import { Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { ProfileType } from './profile.types';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileType)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileType, { name: 'profile', nullable: true })
  profile() {
    return this.profileService.getProfile();
  }
}
