import { DataSource } from 'typeorm';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { seedUserRoles, seedUsers } from './seed-helper';
import { MyLogger } from 'src/common-modules/logger.service';

@Injectable()
export class SeedUsersDatabase {
  // private readonly _dataSource: DataSource
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _loggerService: MyLogger,
  ) {
    // this._dataSource = AppDataSource
    // no such hassle, because we've used the same module configuration for typeorm in main.ts and cli.module.ts, we can directly inject data source here as well
  }

  @Command({ command: 'seed-users', describe: 'A command to seed users' })
  async create(): Promise<void> {
    const queryRunner = this._dataSource.createQueryRunner();

    const RoleAndUserSeedContext = 'role-user-seed';

    try {
      await seedUserRoles(queryRunner, this._loggerService);
      await seedUsers(queryRunner, this._loggerService);
    } catch (error) {
      this._loggerService.error(
        error?.message,
        error?.stack,
        RoleAndUserSeedContext,
      );
    }
  }
}
