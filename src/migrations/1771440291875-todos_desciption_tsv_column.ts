import { MigrationInterface, QueryRunner } from 'typeorm';

export class TodosDesciptionTsvColumn1771440291875
  implements MigrationInterface
{
  name = 'TodosDesciptionTsvColumn1771440291875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" ADD "description_tsv" tsvector`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" DROP COLUMN "description_tsv"`,
    );
  }
}
