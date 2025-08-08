import { Command } from 'nestjs-command';
import { DataSource } from 'typeorm';

/**************************************************
 * Synchronize Users, Admins to CommonUsers Table *
 **************************************************/

export class SyncCommonUsersTable {
  constructor(private readonly _dataSource: DataSource) {}

  @Command({ command: 'sync-common-users' })
  async run() {
    const queryRunner = this._dataSource.createQueryRunner();

    queryRunner.query(`INSERT INTO`);
  }
}
