import { Module } from '@nestjs/common';
import { SeedDatabase } from './db-seed.command';
import { MyLogger } from '../common-modules/logger.service';
import * as dotenv from 'dotenv';
import { DatabaseModule } from '../common-modules/database/database.module';

dotenv.config();

// console.log(__dirname)
@Module({
  imports: [DatabaseModule],
  providers: [SeedDatabase, MyLogger],
})
export class CliModule {}
