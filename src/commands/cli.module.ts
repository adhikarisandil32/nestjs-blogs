import { Module } from '@nestjs/common';
import { MyLogger } from '../common-modules/logger.service';
import * as dotenv from 'dotenv';
import { DatabaseModule } from '../common-modules/database/database.module';
import { SeedUsersDatabase } from './db-seed.command';

dotenv.config();

// console.log(__dirname)
@Module({
  imports: [DatabaseModule],
  providers: [SeedUsersDatabase, MyLogger],
})
export class CliModule {}
