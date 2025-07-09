import { Command, CommandRunner } from 'nest-commander';
import { MyLogger } from '../common-modules/logger.service';
import { DataSource } from 'typeorm';
import { Todos } from '../todos/entities/todos.entity';
const todosJson = require('./todos.json');

@Command({ name: 'seed-todos', description: 'A command to seed todos' })
export class SeedTodoDatabase extends CommandRunner {
  constructor(
    private readonly _loggerService: MyLogger,
    private readonly _dataSource: DataSource,
  ) {
    super();
  }

  async run(): Promise<void> {
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
