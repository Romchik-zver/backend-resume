import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db } from './db';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly orm = db.orm;
  async onModuleDestroy() {
    await db.close();
  }
}
