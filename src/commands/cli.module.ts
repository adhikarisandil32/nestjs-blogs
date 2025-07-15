import { Module } from '@nestjs/common';
import { MyLogger } from '../common-modules/logger.service';
import { DatabaseModule } from '../common-modules/database/database.module';
import { SeedUsersDatabase } from './user-seed.command';
import { SeedTodoDatabase } from './todo-seed.command';

// console.log(__dirname)
@Module({
  imports: [DatabaseModule],
  providers: [MyLogger, SeedUsersDatabase, SeedTodoDatabase],
})
export class CliModule {}
