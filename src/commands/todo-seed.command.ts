import { MyLogger } from 'src/common-modules/logger.service';
import { DataSource } from 'typeorm';
import { Todos } from 'src/modules/todos/entities/todos.entity';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedTodoDatabase {
  constructor(
    private readonly _loggerService: MyLogger,
    private readonly _dataSource: DataSource,
  ) {}

  @Command({ command: 'seed-todos', describe: 'A command to seed todos' })
  async run(): Promise<void> {
    const todosJson = require('./todos-json/todos.json');

    try {
      this._loggerService.log('Starting Todos Seed');
      for (let i = 0; i < todosJson.length; i++) {
        await this._dataSource.manager.insert(Todos, {
          ...todosJson[i],
          isCompleted: Boolean(Math.round(Math.random() * 2)),
          user: Math.ceil(Math.random() * 16),
        });
        console.log(`Todo ${i} inserted`);
      }
      this._loggerService.log('Todos Seeding Successful');
    } catch (error) {
      console.log(error);
    }
  }
}
