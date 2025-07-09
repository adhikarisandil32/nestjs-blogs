import { Command, CommandRunner } from 'nest-commander';
import { MyLogger } from '../common-modules/logger.service';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Users } from '../users/entities/user.entity';
// import { AppDataSource } from '../data-source';

@Command({ name: 'seed-users', description: 'A command to seed users' })
export class SeedUsersDatabase extends CommandRunner {
  // private readonly _dataSource: DataSource
  constructor(
    private readonly _loggerService: MyLogger,
    private readonly _dataSource: DataSource,
  ) {
    super();
    // this._dataSource = AppDataSource

    // no such hassle, because we've used the same module configuration for typeorm in main.ts and cli.module.ts, we can directly inject data source here as well
  }

  async run(): Promise<void> {
    try {
      this._loggerService.log('Starting User Seed');
      for (let i = 1; i <= 16; i++) {
        await this._dataSource.manager.insert(Users, {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: 'Test@123',
        });
        console.log(`User ${i} inserted`);
      }
      this._loggerService.log('User Seeding Successful');
    } catch (error) {
      console.error(error);
    }
  }
}
