import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { MyLogger } from 'src/common-modules/logger/logger.service';
import { addDescriptionSearchField } from 'src/triggers/description-search-field';
import { DataSource } from 'typeorm';

@Injectable()
export class AddTriggers {
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _loggerService: MyLogger,
  ) {}

  @Command({ command: 'add-triggers' })
  async addTriggers() {
    const TRIGGERS_CONTEXT = 'ADD_TRIGGERS';

    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this._loggerService.log('Trigger Adding Start', TRIGGERS_CONTEXT);
      await addDescriptionSearchField(queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      this._loggerService.error(error, error.stack, TRIGGERS_CONTEXT);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

@Injectable()
export class RemoveTriggers {
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _loggerService: MyLogger,
  ) {}

  @Command({ command: 'remove-triggers' })
  async removeTriggers() {
    const TRIGGERS_CONTEXT = 'REMOVE_TRIGGERS';

    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this._loggerService.log('Trigger Adding Start', TRIGGERS_CONTEXT);
      await addDescriptionSearchField(queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      this._loggerService.error(error, error.stack, TRIGGERS_CONTEXT);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
