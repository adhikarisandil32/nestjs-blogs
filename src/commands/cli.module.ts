import { Module } from '@nestjs/common';
import { SeedDatabase } from './db-seed.command';
import { MyLogger } from '../common-modules/logger.service';

@Module({
  imports: [],
  providers: [SeedDatabase, MyLogger],
})
export class CliModule {}
