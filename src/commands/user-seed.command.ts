import { MyLogger } from 'src/common-modules/logger.service';
import { DataSource } from 'typeorm';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { seedUserRoles } from './seed-helper';
// import { AppDataSource } from '../data-source';

@Injectable()
export class SeedUsersDatabase {
  // private readonly _dataSource: DataSource
  constructor(
    private readonly _loggerService: MyLogger,
    private readonly _dataSource: DataSource,
  ) {
    // this._dataSource = AppDataSource
    // no such hassle, because we've used the same module configuration for typeorm in main.ts and cli.module.ts, we can directly inject data source here as well
  }

  @Command({ command: 'seed-users', describe: 'A command to seed users' })
  async create(): Promise<void> {
    const queryRunner = this._dataSource.createQueryRunner();

    try {
      this._loggerService.log('Seeding Start');
      await seedUserRoles(queryRunner);
      // for (let i = 1; i <= 16; i++) {
      //   const user = queryRunner.manager.create(Users, {
      //     name: faker.person.fullName(),
      //     email: faker.internet.email().toLowerCase(),
      //     password: 'Test@123',
      //   });
      //   await queryRunner.manager.save(user);
      //   // using save is important because user entity uses @BeforeInsert decorator which will only act when save used
      //   console.log(`User ${i} inserted`);
      // }
      this._loggerService.log('Seeding Successful');
    } catch (error) {
      console.error(error);
    }
  }
}
