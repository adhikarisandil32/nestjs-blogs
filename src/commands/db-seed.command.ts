import { Command, CommandRunner } from 'nest-commander';
import { faker } from '@faker-js/faker';
import { MyLogger } from '../common-modules/logger.service';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Command({ name: 'seed-users', description: 'A command to seed users' })
export class SeedDatabase extends CommandRunner {
  constructor(
    private readonly _loggerService: MyLogger,
    // @Inject(plainToInstance(AppDataSource, { ...AppDataSource }))
    private readonly _dataSource: DataSource,
  ) {
    super();
  }

  async run(): Promise<void> {
    // console.log({ dataSource: this._dataSource });
    // const queryRunner = this._dataSource.createQueryRunner();

    // try {
    //   this._loggerService.log('Starting User Seed');
    //   for (let i = 1; i <= 16; i++) {
    //     queryRunner.manager.insert(Users, {
    //       name: faker.internet.displayName(),
    //       email: faker.internet.email(),
    //       password: 'Test@123',
    //     });
    //     // .create({
    //     //   email: faker.internet.email(),
    //     // });
    //   }
    //   this._loggerService.log('User Seeding Successful');
    // } catch (error) {
    //   this._loggerService.error(error);
    // }

    this._loggerService.log('hello');
  }
}
