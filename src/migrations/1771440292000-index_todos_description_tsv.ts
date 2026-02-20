import { MigrationInterface, QueryRunner } from 'typeorm';

export class IndexTodosDescriptionTsv1771440292000
  implements MigrationInterface
{
  name = 'IndexTodosDescriptionTsv1771440292000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE INDEX description_tsv_index
        ON todos
        USING GIN(description_tsv);
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP INDEX IF EXISTS description_tsv_index;
      `,
    );
  }
}
