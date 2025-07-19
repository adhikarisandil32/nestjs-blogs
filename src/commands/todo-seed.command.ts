import { MyLogger } from 'src/common-modules/logger.service';
import { DataSource } from 'typeorm';
import { Todos } from 'src/modules/todos/entities/todos.entity';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Users } from 'src/modules/users/entities/user.entity';

@Injectable()
export class SeedTodoDatabase {
  constructor(
    private readonly _loggerService: MyLogger,
    private readonly _dataSource: DataSource,
  ) {}

  /****************
   * Todos Seeder *
   ****************/
  @Command({ command: 'seed-todos', describe: 'A command to seed todos' })
  async run(): Promise<void> {
    const todosJson: {
      title: string;
      description: string;
    }[] = require('./todos-json/todos.json');
    const SeedTodosContext = 'todos-seed';

    const queryRunner = this._dataSource.createQueryRunner();

    const users = await queryRunner.manager.find(Users);

    if (!users) {
      throw new Error('No exisitng users to create relation');
    }

    try {
      this._loggerService.log('Starting Todos Seed', SeedTodosContext);
      for (let i = 0; i < todosJson.length; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const todo = queryRunner.manager.create(Todos, {
          ...todosJson[i],
          isCompleted: Boolean(Math.round(Math.random() * 2)),
          user: randomUser,
        });
        await queryRunner.manager.save(todo);
        console.log(`Todo ${i + 1} inserted`);
      }
      this._loggerService.log('Todos Seeding Successful', SeedTodosContext);
    } catch (error) {
      this._loggerService.error(
        error.message,
        new Error(error).stack,
        SeedTodosContext,
      );
    }
  }
}
