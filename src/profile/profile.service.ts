import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  getProfile() {
    return this.prisma.orm.public.Profile.where({})
      .include('skills')
      .include('experience')
      .include('projects')
      .first();
  }
}
