import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { MyLogger } from 'src/common-modules/logger.service';
import { DataSource } from 'typeorm';

/**************************************************
 * Synchronize Users, Admins to CommonUsers Table *
 **************************************************/

@Injectable()
export class SyncCommonUsersTable {
  constructor(
    private readonly _dataSource: DataSource,
    private readonly _loggerService: MyLogger,
  ) {}

  @Command({ command: 'sync-common-users' })
  async create() {
    const SYNC_COMMON_USERS_CONTEXT = 'common-users-context';

    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();

    // const data = await queryRunner.query(`
    //   SELECT id, name, email, role_id
    //   FROM users
    //   UNION
    //   SELECT id, name, email, role_id
    //   FROM admins
    // `);

    // console.log(data);

    await queryRunner.startTransaction();

    try {
      this._loggerService.log(
        'synchronization start',
        SYNC_COMMON_USERS_CONTEXT,
      );

      const usersAdminsUnionQuery = `
        SELECT name, email, password, role_id
        FROM users
        UNION
        SELECT name, email, password, role_id
        FROM admins
      `;

      const dataReadyToInsert: {
        name: string;
        email: string;
        password: string;
        role_id: number;
      }[] = await queryRunner.query(`
        SELECT name, email, password, role_id
        FROM (${usersAdminsUnionQuery}) as union_table
        WHERE NOT EXISTS (
          SELECT 1
          FROM common_users
          WHERE common_users.email = union_table.email
        );  
      `);

      if (dataReadyToInsert.length > 0) {
        await queryRunner.query(`
          INSERT INTO common_users (name, email, password, role_id)
          VALUES
            ${dataReadyToInsert.map((datum) => `('${datum.name}', '${datum.email}', '${datum.password}', ${datum.role_id})`).join(', ')};
        `);
      }

      console.log(
        `${dataReadyToInsert.length} data inserted to common_users table`,
      );

      await queryRunner.commitTransaction();

      this._loggerService.log(
        'synchronization success',
        SYNC_COMMON_USERS_CONTEXT,
      );
    } catch (error) {
      this._loggerService.error(
        error.message,
        new Error(error).stack,
        SYNC_COMMON_USERS_CONTEXT,
      );
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
