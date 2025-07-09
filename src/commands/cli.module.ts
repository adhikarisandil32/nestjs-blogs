import { Module } from '@nestjs/common';
import { MyLogger } from '../common-modules/logger.service';
import { DatabaseModule } from '../common-modules/database/database.module';
import { SeedUsersDatabase } from './db-seed.command';

// console.log(__dirname)
@Module({
  imports: [DatabaseModule],
  providers: [SeedUsersDatabase, MyLogger],
})
export class CliModule {}
