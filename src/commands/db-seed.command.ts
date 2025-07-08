import { Command, CommandRunner } from 'nest-commander';
import { MyLogger } from '../common-modules/logger.service';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { faker } from '@faker-js/faker';
import { Users } from '../users/entities/user.entity';

@Command({ name: 'seed-users', description: 'A command to seed users' })
export class SeedDatabase extends CommandRunner {
  constructor(
    private readonly _loggerService: MyLogger,
    private readonly _dataSource: DataSource,
  ) {
    super();
  }

  async run(): Promise<void> {
    // const queryRunner = this._dataSource.createQueryRunner();

    try {
      // await queryRunner.connect();
      this._loggerService.log('Starting User Seed');
      for (let i = 1; i <= 16; i++) {
        // await queryRunner.manager.insert(Users, {
        //   name: faker.internet.displayName(),
        //   email: faker.internet.email(),
        //   password: 'Test@123',
        // });
        // console.log(`User ${i} inserted`);
        // .create({
        //   email: faker.internet.email(),
        // });
        await this._dataSource.manager.insert(Users, {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: 'Test@123',
        });
        console.log(`User ${i} inserted`);
      }
      this._loggerService.log('User Seeding Successful');
      // await queryRunner.release();
    } catch (error) {
      console.error(error);
    }
  }
}
